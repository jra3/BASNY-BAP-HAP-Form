
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

export default function MemberForm() {
  const [formData, setFormData] = useState({
    memberName: "", // restore from cookie?
    waterType: "",
    speciesType: "Fish",
    classification: "",
    speciesLatinName: "",
    speciesCommonName: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="text-align: center;">Member Information</h2>
        <p><strong>Member Name:</strong> ${formData.memberName}</p>
        <p><strong>Species Latin Name:</strong> ${formData.speciesLatinName}</p>
        <p><strong>Species Common Name:</strong> ${formData.speciesCommonName}</p>
      </div>
    `;
    const newWindow = window.open("", "_blank");
    newWindow?.document.write(printContent);
    newWindow?.document.close();
    newWindow?.print();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Member Form</h2>
      <form className="space-y-4">
        <Input
          name="memberName"
          placeholder="Member Name"
          value={formData.memberName}
          onChange={handleChange}
        />

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

        <div>
          <Label className="block font-light mb-2">Category:</Label>
          <RadioGroup defaultValue={"Fish"} onValueChange={value => setFormData({ ...formData, speciesType: value, classification: "" })} className="flex gap-4">
            {
              Object.keys(SpeciesTypesAndClasses).map((speciesType, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={speciesType} id={`r${index}`} />
                  <Label htmlFor={`r${index}`}>{speciesType}</Label>
                </div>          
              ))
            }
          </RadioGroup>
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

        <Input
          name="speciesCommonName"
          placeholder="Species Common Name"
          value={formData.speciesCommonName}
          onChange={handleChange}
        />

        <Input
          name="speciesLatinName"
          placeholder="Species Latin Name"
          value={formData.speciesLatinName}
          onChange={handleChange}
        />

        <Label className="block font-semibold">{
          (function () {
            switch (formData.speciesType) {
              case "Fish":
              case "Invert":
                return "Date Spawned:";
              case "Plant":
                return "Date Propagated / Started:";
              case "Coral":
                return "Date Propagated:";
            }
          })()
        }</Label>
        <Input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />

        <Button className="w-full" type="button" onClick={handlePrint}>
          Print Form
        </Button>
      </form>

      <Card className="mt-6 p-4">
        <CardContent>
          <h3 className="text-lg font-semibold">Preview</h3>
          <p><strong>Member Name:</strong> {formData.memberName}</p>
          <p><strong>Species Latin Name:</strong> {formData.speciesLatinName}</p>
          <p><strong>Species Common Name:</strong> {formData.speciesCommonName}</p>
        </CardContent>
      </Card>
    </div>
  );
}