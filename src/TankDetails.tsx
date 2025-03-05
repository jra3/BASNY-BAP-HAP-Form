import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { FormValues } from "./Schema";

import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";
import { useEffect, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label"

export function getSavedTanks() {
  const savedTanks = localStorage.getItem("savedTanks") ?? "{}";
  const tanks = savedTanks ? JSON.parse(savedTanks) : [];
  if (typeof tanks !== 'object') {
    return {};
  }
  return tanks;
}

type FormKeys = keyof FormValues;
const tankDetailsKeys: FormKeys[] = [
  "tankSize",
  "filterType",
  "changeVolume",
  "changeFrequency",
  "temperature",
  "pH",
  "GH",
  "specificGravity",
  "substrateType",
  "substrateDepth",
  "substrateColor",
  "lightType",
  "lightStrength",
  "lightHours",
]

type Form = {
  setValue: UseFormSetValue<FormValues>,
  getValues: UseFormGetValues<FormValues>,
}

type TankDetailsControlsProps = {
  form: Form,
}

function filterObject(obj: Record<string, any>, allowedKeys: string[]) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowedKeys.includes(key))
  );
}

function resetTankDetails(form: { setValue: UseFormSetValue<FormValues> }) {
  tankDetailsKeys.map((key) => form.setValue(key, ""));
}

export function TankDetailsControls({ form }: TankDetailsControlsProps) {

  const [newTankName, setNewTankName] = useState("");

  const savedTanks = JSON.parse(localStorage.getItem('savedTanks') || '{}');
  const [tanks, setTanks] = useState(savedTanks);

  useEffect(() => {
    console.log("saving tanks", JSON.stringify(tanks, null, 2))
    localStorage.setItem('savedTanks', JSON.stringify(tanks))
  }, [tanks])

  const saveTankDetails = (tankName: string) => {
    let newTanks = { ...tanks };
    const values = filterObject(form.getValues(), tankDetailsKeys);
    newTanks[tankName] = values;
    setTanks(newTanks);
  }

  const restoreTankDetails = (tankValues: any) => {
    for (const key of tankDetailsKeys) {
      form.setValue(key, tankValues[key] ?? "");
    }
  }

  const deleteSavedTank = (tankName: string) => {
    console.log('delete initiated for ', tankName);
    let newTanks = { ...tanks };
    delete newTanks[tankName];
    setTanks(newTanks);
  }

  const clearButton = <Button key="clear" variant="destructive" type="button" onClick={() => resetTankDetails(form)}>Clear</Button>

  const saveButton = <Sheet key={"save"}>
    <SheetTrigger asChild>
      <Button variant="outline">Save</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Save Tank Details</SheetTitle>
        <SheetDescription>
          Save these details in your browser for future form submissions.
        </SheetDescription>
      </SheetHeader>
      <div className="m-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            placeholder="5g killi tank..."
            value={newTankName}
            onChange={(e) => setNewTankName(e.target.value)}
          />
        </div>
      </div>
      <SheetFooter>
        <SheetClose>
          <Button className="w-full" type="button" disabled={newTankName.length === 0} onClick={() => saveTankDetails(newTankName)}>
            Save
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet >

  const loadButton = <Sheet key="load">
    <SheetTrigger asChild>
      {
        Object.keys(tanks).length > 0 &&
        <Button variant="outline">Load</Button>
      }
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Load Tank Details</SheetTitle>
        <SheetDescription>
          Load previously saved tank data
        </SheetDescription>
      </SheetHeader>
      <div className="m-4">
        {
          Object.entries(tanks).map((entry, index) => {
            const [tankName, data] = entry;
            return <div key={index} className="flex justify-between items-center">
              <SheetClose>
                <Button onClick={() => restoreTankDetails(data)} variant="link">
                  {tankName}
                </Button>
              </SheetClose>
              <Button variant="destructive" size="sm" onClick={() => deleteSavedTank(tankName)}>-</Button>
            </div>
          })
        }
      </div>
    </SheetContent>
  </Sheet >;

  return [clearButton, saveButton, loadButton];
}
