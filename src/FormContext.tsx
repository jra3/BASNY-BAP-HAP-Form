import { createContext, useContext, useState, ReactNode } from 'react';
import { FormValues } from './Schema';

interface FormContextType {
  formData: FormValues;
  setFormData: (data: FormValues) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const defaultValues: FormValues = {
  memberName: "",

  speciesType: "Fish",
  waterType: "Fresh",
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

  CO2: "NO",
  CO2Description: "",
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormValues>(defaultValues);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};