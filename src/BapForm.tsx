
import React, { JSX, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MultiSelectCombobox from './components/MultiSelectCombobox';
import { Separator } from './components/ui/separator';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import { ControllerProps, ControllerRenderProps, FieldPath, FieldValues, useForm } from 'react-hook-form';
import FertilizerInput from './FertilizerInput';

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

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

const formSchema = z.object({
  memberName: z.string().min(1, { message: "Required." }),
  //waterType: z.enum(["Fresh", "Brackish", "Salt"]),
  //speciesType: z.enum(["Fish", "Invert", "Plant", "Coral"]),
  //classification: z.string().min(1),
  speciesLatinName: z.string().min(1, { message: "Required" }),
  speciesCommonName: z.string().min(1, { message: "Required" }),
});

export default function BapForm() {
  const [formData, setFormData] = useState({
    memberName: "", // restore from cookie?
    waterType: "",
    speciesType: "Fish",
    classification: "",
    speciesLatinName: "",
    speciesCommonName: "",
    date: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
    count: "",
    foods: [] as string[],
    spawnLocations: [] as string[],
    propagationMethod: "",

    tankSize: "",
    filterType: "",
    changeVolume: "",
    changeFrequency: "",
    temperature: "",
    pH: "",
    GH: "",
    specificGravity: "",
    substrateType: "",
    substrateDepth: "",
    substrateColor: "",

    CO2: false,
    CO2Description: "",
    ferts: [["", ""]],
    lightType: "",
    lightStrength: "",
    lightHours: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFertChange = (x: number, y: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const ferts = formData.ferts;
      ferts[x][y] = e.target.value;
      setFormData({ ...formData, ferts });
    };
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Form submitted successfully");
      console.log(values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  const handlePrint = () => {
    let printContent = `

      <div style="font-family: Arial, sans-serif; padding: 20px;">
    
        <p><strong>Member Name:</strong> ${formData.memberName}</p>
        
        <hr/>

        <p><strong>Water Type:</strong> ${formData.waterType}</p>
        <p><strong>Species Type:</strong> ${formData.speciesType}</p>
        <p><strong>Species Class:</strong> ${formData.speciesCommonName}</p>
        <p><strong>Species Latin Name:</strong> ${formData.speciesLatinName}</p>
        <p><strong>Species Common Name:</strong> ${formData.speciesCommonName}</p>
        <p><strong>Date Spawned / Propagated:</strong> ${formData.date}</p>
    `;

    if (formData.speciesType === "Fish" || formData.speciesType === "Invert") {
      printContent += `
        <p><strong>Number Of Fry:</strong> ${formData.count}</p>
        <p><strong>Foods:</strong> ${formData.foods.join(", ")}</p>
        <p><strong>Spawn Locations:</strong> ${formData.spawnLocations.join(", ")}</p>
      `;

    } else {
      printContent += `
        <p><strong>Propagation Method:</strong> ${formData.propagationMethod}</p>
      `;
    }

    printContent += `
        </div>
        <hr/>
        <div style="font-family: Arial, sans-serif; padding: 20px;">
    `;

    const newWindow = window.open("", "_blank");
    newWindow?.document.write(printContent);
    //newWindow?.document.close();
    //newWindow?.print();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberName: "",
      speciesLatinName: "",
      speciesCommonName: "",
    }
  })

  const renderTextField = (placeholder: string) =>
    ({ field }: { field: ControllerRenderProps<any, any> }) => (
      <FormItem>
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">BAP/HAP Submission</h2>

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >

          <FormField control={form.control} name="memberName" render={renderTextField("Member Name")} />
          <Card id="species-details">
            <CardHeader>
              <CardTitle>Species Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className='flex gap-2'>
                <Select onValueChange={value => setFormData({ ...formData, speciesType: value, classification: "" })} value={formData.speciesType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Species Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(SpeciesTypesAndClasses).map((speciesType) => (
                      <SelectItem key={speciesType} value={speciesType}>
                        {speciesType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={value => setFormData({ ...formData, waterType: value })} value={formData.waterType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Water Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Fresh", "Brackish", "Salt"].map((waterType) => (
                      <SelectItem key={waterType} value={waterType}>
                        {waterType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select onValueChange={value => setFormData({ ...formData, classification: value })} value={formData.classification}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  {(SpeciesTypesAndClasses[formData.speciesType] ?? []).map((classType) => (
                    <SelectItem key={classType} value={classType}>
                      {classType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormField control={form.control} name="speciesCommonName" render={renderTextField("Species Common Name")} />
              <FormField control={form.control} name="speciesLatinName" render={renderTextField("Species Latin Name")} />

              <div className="flex items-center space-x-3">
                <Label className="w-60 text-right font-bold">{
                  (function () {
                    switch (formData.speciesType) {
                      case "Fish":
                      case "Invert":
                        return "Date Spawned:";
                      case "Plant":
                      case "Coral":
                        return "Date Propagated:";
                    }
                  })()
                }
                </Label>
                <Input name="date" type="date" value={formData.date} onChange={handleChange} />
              </div>

              {
                (function () {
                  switch (formData.speciesType) {
                    case "Fish":
                    case "Invert":
                      return <>
                        <Input
                          name="count"
                          placeholder="Number Of Fry"
                          value={formData.count}
                          onChange={handleChange}
                        />

                        <MultiSelectCombobox
                          name="foods"
                          placeholder='Foods (select all)'
                          addsAllowed
                          options={FoodTypes}
                          onChange={(selected) => setFormData({ ...formData, foods: selected })}
                        />

                        <MultiSelectCombobox
                          name="spawnLocations"
                          placeholder='Spawning Location (select all that apply)'
                          addsAllowed
                          options={SpawnLocations}
                          onChange={(selected) => setFormData({ ...formData, spawnLocations: selected })}
                        />

                      </>
                    case "Plant":
                    case "Coral":
                      return <FormField
                        control={form.control}
                        name="propagationMethod"
                        render={renderTextField("Method Of Propagation")} />
                  }
                })()
              }

            </CardContent>
          </Card>

          <Card id="tank-details">
            <CardHeader>
              <CardTitle>Tank Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">

                <FormField control={form.control} name="tankSize" render={renderTextField("Tank Size")} />
                <FormField control={form.control} name="filterType" render={renderTextField("Filter Type")} />
                <FormField control={form.control} name="changeVolume" render={renderTextField("Water Change Volume (%)")} />
                <FormField control={form.control} name="changeFrequency" render={renderTextField("Water Change Frequency")} />
                <FormField control={form.control} name="temperature" render={renderTextField("Temperature")} />
                <FormField control={form.control} name="pH" render={renderTextField("pH")} />
                <FormField control={form.control} name="GH" render={renderTextField("Hardness (GH)")} />
                <FormField control={form.control} name="specificGravity" render={renderTextField("Specific Gravity")} />
                <FormField control={form.control} name="substrateType" render={renderTextField("Substrate Type")} />
                <FormField control={form.control} name="substrateDepth" render={renderTextField("Substrate Depth")} />
                <FormField control={form.control} name="substrateColor" render={renderTextField("Substrate Color")} />

                {
                  ["Plant", "Coral"].includes(formData.speciesType) &&
                  <>
                    <FormField control={form.control} name="lightType" render={renderTextField("Type Of Light")} />
                    <FormField control={form.control} name="lightStrength" render={renderTextField("Wattage / PAR")} />
                    <FormField control={form.control} name="lightHours" render={renderTextField("Light Hours")} />
                  </>
                }

              </div>
            </CardContent>
          </Card>

          {
            ["Plant", "Coral"].includes(formData.speciesType) &&
            <Card id='plant-coral-supplemental'>
              <CardHeader>
                <CardTitle>Fertilizers & Supplements</CardTitle>
              </CardHeader>

              <CardContent className='space-y-2'>
                <FertilizerInput />

                <Separator orientation="horizontal" />

                <div className='flex items-center space-x-3'>
                  <Label className='text-left'>CO2?</Label>
                  <RadioGroup
                    onValueChange={(value) => setFormData({ ...formData, CO2: value === "Yes" })}
                    className="flex"
                    defaultValue="No">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yes" id="yes-co2" />
                      <Label htmlFor="yes-co2">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="no-co2" />
                      <Label htmlFor="no-co2">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {
                  formData.CO2 && (
                    <FormField
                      control={form.control}
                      name="CO2Description"
                      render={renderTextField("Describe CO2 supplementation")} />
                  )
                }

              </CardContent>
            </Card>
          }

          <FormMessage />

          <Button className="w-full" type="submit">
            Validate Form
          </Button>

          <Button className="w-full" type="button" onClick={handlePrint}>
            Print Form
          </Button>

        </form>
      </Form>
    </div >
  );
}