import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

type Fert = { substance: string, regimen: string };

export default function FertilizerInput() {
    const [ferts, setFerts] = useState<Fert[]>([{ substance: "", regimen: "" }]);

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
                    }}
                />

                <Input
                    placeholder="How much / How often"
                    value={regimen}
                    onChange={(e) => {
                        const newFerts = ferts;
                        newFerts[index].regimen = e.target.value;
                        setFerts(newFerts);
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
                    }}>-</Button>
            </div>
        })}

        <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => {
                setFerts([...ferts, { substance: "", regimen: "" }]);
            }} >+</Button>
    </>
}