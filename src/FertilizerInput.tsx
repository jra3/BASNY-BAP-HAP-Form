import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

type Fert = { substance: string, regimen: string };

type Props = {
  onChange?: (ferts: Fert[]) => void;
  value?: Fert[];
}

export default function FertilizerInput(props: Props) {
  const [ferts, setFerts] = useState<Fert[]>(props.value ?? [{ substance: "", regimen: "" }]);

  return <>
    {ferts.map((fert, index) => {
      const { substance, regimen } = fert;

      return <div className="flex gap-2" key={`fert${index}`}>
        <Input
          placeholder="Fertilizer / Supplement"
          value={substance}
          onChange={(e) => {
            const newFerts = ferts;
            newFerts[index].substance = e.target.value;
            setFerts(newFerts);
            props.onChange?.(newFerts);
          }}
        />

        <Input
          placeholder="How much / How often"
          value={regimen}
          onChange={(e) => {
            const newFerts = ferts;
            newFerts[index].regimen = e.target.value;
            setFerts(newFerts);
            props.onChange?.(newFerts);
          }}
        />

        <Button
          type="button"
          size="sm"
          variant="destructive"
          onClick={() => {
            const newFerts = [...ferts];
            newFerts.splice(index, 1);
            setFerts(newFerts);
            props.onChange?.(newFerts);
          }}>-</Button>
      </div>
    })}

    <Button
      type="button"
      size="sm"
      variant="ghost"
      onClick={() => {
        const newFerts = [...ferts, { substance: "", regimen: "" }];
        setFerts(newFerts);
        props.onChange?.(newFerts);
      }} >+ Add</Button>
  </>
}