
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    count: "",
    foods: [],
    spawnLocations: [],

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
    ferts: [["", ""]]
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
        <Card>
          <CardHeader>
            <CardTitle>Species Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

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

            <div className="flex items-center space-x-3">
              <Label className="font-light w-60 text-right">{
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

              <Input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
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

                      <Input
                        name="foods"
                        placeholder="TODO multiselect Foods Fed"
                        value={formData.foods}
                        onChange={handleChange}
                      />

                      <Input
                        name="spawnLocations"
                        placeholder="TODO multiselect Species Bred On/In"
                        value={formData.spawnLocations}
                        onChange={handleChange}
                      />
                    </>
                  case "Plant":
                  case "Coral":
                    return <>
                      <Input
                        name="propagationMethod"
                        placeholder="Method Of Propagation"
                        value={formData.count}
                        onChange={handleChange}
                      />
                    </>

                }
              })()
            }

          </CardContent>
        </Card>

        <Card>

          <CardHeader>
            <CardTitle>Tank Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">

              <Input
                name="tankSize"
                placeholder="Tank Size"
                value={formData.tankSize}
                onChange={handleChange}
              />

              <Input
                name="filterType"
                placeholder="Filter Type"
                value={formData.filterType}
                onChange={handleChange}
              />

              <Input
                name="changeVolume"
                placeholder="Water Change Volume (%)"
                value={formData.changeVolume}
                onChange={handleChange}
              />

              <Input
                name="changeFrequency"
                placeholder="Water Change Frequency"
                value={formData.changeFrequency}
                onChange={handleChange}
              />

              <Input
                name="temperature"
                placeholder="Temperature"
                value={formData.temperature}
                onChange={handleChange}
              />

              <Input
                name="pH"
                placeholder="pH"
                value={formData.pH}
                onChange={handleChange}
              />

              <Input
                name="GH"
                placeholder="Hardness (GH)"
                value={formData.GH}
                onChange={handleChange}
              />

              <Input
                name="specificGravity"
                placeholder="Specific Gravity"
                value={formData.specificGravity}
                onChange={handleChange}
              />

              <Input
                name="substrateType"
                placeholder="Substrate Type"
                value={formData.substrateType}
                onChange={handleChange}
              />

              <Input
                name="substrateDepth"
                placeholder="Substrate Depth"
                value={formData.substrateDepth}
                onChange={handleChange}
              />

              <Input
                name="substrateColor"
                placeholder="Substrate Color"
                value={formData.substrateColor}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>

          <CardHeader>
            <CardTitle>Fertilizers & Supplements</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {
              formData.ferts.map((fert, index) => {
                const [substance, regimen] = fert;

                const handleFertChange = (x: number, y: number) => {
                  return (e: React.ChangeEvent<HTMLInputElement>) => {
                    const ferts = formData.ferts;
                    ferts[x][y] = e.target.value;
                    setFormData({ ...formData, ferts });
                  };
                }

                return <>
                  <div className="flex">
                    <Input
                      placeholder="Fertilizer / Supplement"
                      value={substance}
                      onChange={handleFertChange(index, 0)}
                    />
                    <Input
                      placeholder="How much / How often"
                      value={regimen}
                      onChange={handleFertChange(index, 1)}
                    />
                    <a onClick={(e) => {
                      const poop = formData.ferts.splice(index, 1);
                      console.log(poop, formData.ferts);
                      setFormData({ ...formData });
                    }}>
                      -
                    </a>
                  </div>
                </>
              })
            }

            <a onClick={(e) => {
              const ferts = formData.ferts;
              setFormData({ ...formData, ferts: [...ferts, ["", ""]] });
            }}>
              Add+
            </a>

            <div className='flex items-center space-x-3'>
              <Label className='text-left'>CO2?</Label>
              <RadioGroup
                onValueChange={(value) => setFormData({ ...formData, CO2: value === "Yes" })}
                className="flex space-y-1"
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

              {formData.CO2 && (
                <Input
                  name="CO2Description"
                  placeholder="Describe CO2 supplementation"
                  value={formData.CO2Description}
                  onChange={handleChange}
                />)
              }
            </div>

          </CardContent>
        </Card>


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