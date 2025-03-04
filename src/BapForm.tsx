
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MultiSelectCombobox from './components/MultiSelectCombobox';
import { Separator } from './components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerRenderProps, useForm } from 'react-hook-form';
import FertilizerInput from './FertilizerInput';
import { Textarea } from './components/ui/textarea';
import { bapSchema, foodTypes, FormValues, isLivestock, spawnLocations, speciesTypesAndClasses } from './Schema';
import { useFormContext } from './FormContext';
import { useNavigate } from 'react-router-dom';

const renderTextField = (label: string, placeholder: string) =>
  ({ field }: { field: ControllerRenderProps<any, any> }) => (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );

const renderSelectField = (label: string, options: string[], placeholder = "") => {
  return ({ field }: { field: ControllerRenderProps<any, any> }) => (
    <FormItem className='w-full'>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

export default function BapForm() {
  const { formData, setFormData } = useFormContext();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(bapSchema),
    defaultValues: formData,
  });

  function onSubmit(data: FormValues) {
    setFormData(data);
    navigate('/render');
  };

  const CO2 = form.watch("CO2");

  const memberName = form.watch("memberName");
  useEffect(() => {
    localStorage.setItem("memberName", memberName);
  }, [memberName]);

  // Reset class options when species type changes
  const [classOptions, setClassOptions] = useState(speciesTypesAndClasses[form.getValues().speciesType] ?? []);
  const speciesType = form.watch("speciesType");
  useEffect(() => {
    // XXX resetting to "" does not seem to restore the placeholder string
    form.resetField("classification");
    setClassOptions(speciesTypesAndClasses[speciesType] ?? []);
  }, [speciesType]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">BAP/HAP Submission</h2>

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >

          <FormField control={form.control} name="memberName" render={renderTextField("Member Name", "Jacques Cousteau...")} />

          <Card id="species-details">
            <CardHeader>
              <CardTitle>Species Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className='flex gap-2'>

                <FormField
                  control={form.control}
                  name="speciesType"
                  render={renderSelectField("Species Type", Object.keys(speciesTypesAndClasses))} />

                <FormField
                  control={form.control}
                  name="waterType"
                  render={renderSelectField("Water Type", ["Fresh", "Brackish", "Salt"])} />

              </div >

              <FormField
                control={form.control}
                name="classification"
                render={renderSelectField("Class", classOptions, `BAP/HAP class of ${speciesType}`)} />

              <FormField control={form.control} name="speciesCommonName" render={renderTextField("Species Common Name", "Guppy")} />
              <FormField control={form.control} name="speciesLatinName" render={renderTextField("Species Latin Name", "Poecilia Reticulata")} />

              {
                (function () {
                  if (isLivestock(speciesType)) {
                    return <>
                      <FormField
                        control={form.control}
                        name="count"
                        render={renderTextField("# of Fry", "Zillions")} />

                      <FormField control={form.control} name="foods" render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Foods</FormLabel>
                          <FormControl>
                            <MultiSelectCombobox
                              placeholder='Select all that apply'
                              addsAllowed
                              options={foodTypes}
                              selectedValues={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="spawnLocations" render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Spawn Locations</FormLabel>
                          <FormControl>
                            <MultiSelectCombobox
                              placeholder='Select all that apply'
                              addsAllowed
                              options={spawnLocations}
                              selectedValues={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                    </>

                  } else {
                    return <FormField
                      control={form.control}
                      name="propagationMethod"
                      render={renderTextField("Method of Propagation", "Seeds, Cuttings, Runners ...")} />;
                  }
                })()
              }


            </CardContent >
          </Card >

          <Card id="tank-details">
            <CardHeader>
              <CardTitle>Tank Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">

                <FormField control={form.control} name="tankSize" render={renderTextField("Tank Size", "5g, 20 Long, 100g stock tank...")} />
                <FormField control={form.control} name="filterType" render={renderTextField("Filter Type", "Sponge, HOB...")} />
                <FormField control={form.control} name="changeVolume" render={renderTextField("Water Change Volume (%)", "10, 20, 50...")} />
                <FormField control={form.control} name="changeFrequency" render={renderTextField("Water Change Frequency", "Daily, Weekly, Monthly...")} />
                <FormField control={form.control} name="temperature" render={renderTextField("Temperature", "75F...")} />
                <FormField control={form.control} name="pH" render={renderTextField("pH", "7.0...")} />
                <FormField control={form.control} name="GH" render={renderTextField("Hardness (GH)", "200 ppm, 10 dH...")} />
                <FormField control={form.control} name="specificGravity" render={renderTextField("Specific Gravity", "1.025...")} />
                <FormField control={form.control} name="substrateType" render={renderTextField("Substrate Type", "Sand, Gravel, Barebottom...")} />
                <FormField control={form.control} name="substrateDepth" render={renderTextField("Substrate Depth", "2\"...")} />
                <FormField control={form.control} name="substrateColor" render={renderTextField("Substrate Color", "Brown, White, Hot Pink...")} />

                {
                  !isLivestock(speciesType) &&
                  <>
                    <FormField control={form.control} name="lightType" render={renderTextField("Type Of Light", "LED, Sunlight...")} />
                    <FormField control={form.control} name="lightStrength" render={renderTextField("Wattage / PAR", "50W, 5PAR")} />
                    <FormField control={form.control} name="lightHours" render={renderTextField("Light Hours", "14 Hours")} />
                  </>
                }

              </div>
            </CardContent>
          </Card>

          {
            !isLivestock(speciesType) &&
            <Card id='plant-coral-supplemental'>
              <CardHeader>
                <CardTitle>Fertilizers & Supplements</CardTitle>
              </CardHeader>

              <CardContent className='space-y-2'>

                <FormField
                  control={form.control}
                  name="ferts"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FertilizerInput onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator orientation="horizontal" />

                <FormField
                  control={form.control}
                  name="CO2"
                  render={({ field }) => (
                    <FormItem className="flex gap-x-4">
                      <FormLabel>CO2</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col"
                        >
                          {[
                            ["No", "no"],
                            ["Yes", "yes"],
                          ].map((option, index) => (
                            <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                              <FormControl>
                                <RadioGroupItem value={option[1]} checked={option[1] === form.getValues().CO2} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option[0]}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {
                  CO2 === "YES" && (
                    <FormField
                      control={form.control}
                      name="CO2Description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="3 bubbles per second per 10 gallons of water. injected during the daylight period..."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Describe CO2 supplementation.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                }

              </CardContent>
            </Card>
          }

          <FormMessage />

          <div className='flex gap-4'>
            <Button className="w-full" type="submit" disabled={!form.formState.isValid && form.formState.submitCount > 0}>
              Next
            </Button>
            {!form.formState.isValid && form.formState.submitCount > 0 &&
              <Button className="w-full bg-destructive" type="button" onClick={() => onSubmit(form.getValues())}>
                Print with blanks
              </Button>
            }
          </div>
        </form >
      </Form >
    </div >
  );
}