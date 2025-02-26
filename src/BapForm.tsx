
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
import * as z from "zod"
import { ControllerRenderProps, useForm } from 'react-hook-form';
import FertilizerInput from './FertilizerInput';
import { Textarea } from './components/ui/textarea';

const SpeciesTypesAndClasses: Record<string, string[]> = {
  "Fish": [
    "Anabantoids",
    "Brackish Water",
    "Catfish & Loaches",
    "Characins",
    "Cichlids",
    "Cyprinids",
    "Killifish",
    "Livebearers",
    "Miscellaneous",
    "Marine",
    "Native",
  ],
  "Invert": [
    "Snail",
    "Shrimp",
    "Other",
  ],
  "Plant": [
    "Apongetons & Criniums",
    "Anubias & Lagenandra",
    "Cryptocoryne",
    "Floating Plants",
    "Primative Plants",
    "Rosette Plants",
    "Stem Plants",
    "Sword Plants",
    "Water Lilles",
  ],
  "Coral": [
    "Hard",
    "Soft",
  ],
}

const FoodTypes = [
  "Live",
  "Frozen",
  "Flake",
  "Pellet",
  "Freeze Dried",
  "Vegetable",
  "Gel",
  "Insect",
];

const SpawnLocations = [
  "Rock",
  "Log",
  "Cave",
  "Plant",
  "Glass",
  "Peat",
  "Pipe",
  "Mop",
  "Filter Tube",
  "Earth",
];

const formSchema = z.object({
  memberName: z.string().min(1, { message: "Required." }),
  waterType: z.enum(["Fresh", "Brackish", "Salt"], { required_error: "Required." }),
  speciesType: z.enum(["Fish", "Invert", "Plant", "Coral"], { required_error: "Required." }),
  date: z.date({ required_error: "Required." }),
  classification: z.string().min(1, { message: "Required" }),
  speciesLatinName: z.string().min(1, { message: "Required" }),
  speciesCommonName: z.string().min(1, { message: "Required" }),
  count: z.string().optional(),
  foods: z.array(z.string()).optional(),
  spawnLocations: z.array(z.string()).optional(),
  propagationMethod: z.string().optional(),

  tankSize: z.string().min(1, { message: "Required" }),
  filterType: z.string().min(1, { message: "Required" }),
  changeVolume: z.string().min(1, { message: "Required" }),
  changeFrequency: z.string().min(1, { message: "Required" }),
  temperature: z.string().min(1, { message: "Required" }),
  pH: z.string().min(1, { message: "Required" }),
  GH: z.string().min(1, { message: "Required" }),
  specificGravity: z.string().optional(),
  substrateType: z.string().min(1, { message: "Required" }),
  substrateDepth: z.string().min(1, { message: "Required" }),
  substrateColor: z.string().min(1, { message: "Required" }),

  lightType: z.string().optional(),
  lightStrength: z.string().optional(),
  lightHours: z.string().optional(),

  ferts: z.array(
    z.object({
      substance: z.string(),
      regimen: z.string(),
    })
  ).optional(),

  CO2: z.enum(["no", "yes"]).optional(),
  CO2Description: z.string().optional(),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    console.log("Form submitted successfully");
    console.log(values);
  } catch (error) {
    console.error("Form submission error", error);
  }
}

function handlePrint(values: z.infer<typeof formSchema>) {
  try {
    console.log(values.ferts);
  } catch (error) {
    console.error("Form submission error", error);
  }
}

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberName: "",

      speciesType: "Fish",
      waterType: undefined,
      date: new Date(),
      speciesLatinName: "",
      speciesCommonName: "",
      classification: "",
      count: "",
      spawnLocations: [],
      foods: [],

      tankSize: "",
      filterType: "",
      changeVolume: "",
      changeFrequency: "",

      GH: "",
      pH: "",
      specificGravity: "",
      substrateType: "",
      substrateDepth: "",
      substrateColor: "",
      temperature: "",
      lightHours: "",
      lightStrength: "",
      lightType: "",

      CO2: "no",
      CO2Description: "",
    }
  })

  const CO2 = form.watch("CO2");

  // Reset class options when species type changes
  const [classOptions, setClassOptions] = useState(SpeciesTypesAndClasses[form.getValues().speciesType] ?? []);
  const speciesType = form.watch("speciesType");
  useEffect(() => {
    // XXX resetting to "" does not seem to restore the placeholder string
    form.resetField("classification");
    setClassOptions(SpeciesTypesAndClasses[speciesType] ?? []);
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
                  render={renderSelectField("Species Type", Object.keys(SpeciesTypesAndClasses))} />

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
                  switch (speciesType) {
                    case "Fish":
                    case "Invert":
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
                                options={FoodTypes}
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
                                options={SpawnLocations}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                      </>
                    case "Plant":
                    case "Coral":
                      return <FormField
                        control={form.control}
                        name="propagationMethod"
                        render={renderTextField("Method of Propagation", "Seeds, Cuttings, Runners ...")} />
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
                  ["Plant", "Coral"].includes(speciesType) &&
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
            ["Plant", "Coral"].includes(speciesType) &&
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
                          onValueChange={(value) => {
                            console.log(value);
                            field.onChange(value);
                          }}
                          className="flex flex-col"
                        >
                          {[
                            ["No", "no"],
                            ["Yes", "yes"],
                          ].map((option, index) => (
                            <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                              <FormControl>
                                <RadioGroupItem value={option[1]} />
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
                  CO2 === "yes" && (
                    <FormField
                      control={form.control}
                      name="CO2Description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="3 bubbles per second per 10 gallons of water. injected during the daylight period..."
                              className="resize-none"
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

          <Button className="w-full" type="submit">
            Validate Form
          </Button>

          <Button className="w-full" type="button" onClick={() => handlePrint(form.getValues())}>
            Print Form
          </Button>

        </form >
      </Form >
    </div >
  );
}