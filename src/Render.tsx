import { useEffect } from 'react';
import { useFormContext } from './FormContext';
import { useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';

const formCell = cn("flex", "flex-1", "border", "border-black", "h-6");
const label = cn("block", "font-extralight", "text-xs");
const valueText = cn("block", "font-semibold");

const PrintPage = () => {
  const { formData } = useFormContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!formData.memberName) {
      navigate('/');
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white">
      <h2 className="text-xl font-bold text-center mb-6">BROOKLYN AQUARIUM SOCIETY - BAP / HAP SUBMISSION FORM</h2>

      <div className='flex-col'>
        <div className={formCell}>
          <span className={cn(label, "min-w-40")}>MEMBER NAME</span>
          <span className={valueText}>{formData.memberName}</span>
        </div>

        <div className={formCell}>
          <span className={cn(label, "min-w-40")}>SPECIES COMMON NAME</span>
          <span className={valueText}>{formData.speciesCommonName}</span>
        </div>

        <div className={formCell}>
          <span className={cn(label, "min-w-40")}>SPECIES LATIN NAME</span>
          <span className={valueText}>{formData.speciesLatinName}</span>
        </div >

        <div className='flex'>
          <div className={formCell}>
            <span className={cn(label, "mr-1")}>DATE SPAWNED / PROPAGATED</span>
            <span className={valueText}>{formData.date.toDateString()}</span>
          </div>
          <div className={formCell}>
            <span className={cn(label, "mr-1")}>CLASS</span>
            <span className={valueText}>{formData.classification}</span>
          </div>
        </div>

        <div className={formCell}>
          <span className={cn(label, "min-w-40")}> SPECIES TYPE</span>
          <span className={valueText}>{formData.speciesType}</span>
        </div >
        <div className={formCell}>
          <span className={cn(label, "min-w-40")} > WATER TYPE</span>
          <span className={valueText}>{formData.waterType}</span>
        </div >

        <div className='flex'>
          <div className={formCell}>
            <span className={label}>TANK SIZE</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.tankSize}</span>
          </div>
          <div className={formCell}>
            <span className={label}>SUBSTRATE COLOR</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.substrateColor}</span>
          </div>
        </div>

        <div className='flex'>
          <div className={formCell}>
            <span className={label}>FILTER TYPE</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.filterType}</span>
          </div>
          <div className={formCell}>
            <span className={label}>TEMPERATURE</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.temperature}</span>
          </div>
        </div>

        <div className='flex'>
          <div className={formCell}>
            <span className={label}>WATER CHANGE VOLUME</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.changeVolume}</span>
          </div>
          <div className={formCell}>
            <span className={label}>pH</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.pH}</span>
          </div>
        </div>

        <div className='flex'>
          <div className={formCell}>
            <span className={label}>WATER CHANGE FREQUENCY</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.changeFrequency}</span>
          </div>
          <div className={formCell}>
            <span className={label}>HARDNESS (GH)</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.GH}</span>
          </div>
        </div>

        <div className='flex'>
          <div className={formCell}>
            <span className={label}>SUBSTRATE TYPE</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.substrateType}</span>
          </div>
          <div className={formCell}>
            <span className={label}>SPECIFIC GRAVITY (SP.G.)</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.specificGravity}</span>
          </div>
        </div>

        <div className='flex'>
          <div className={formCell}>
            <span className={label}>SUBSTRATE DEPTH</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.substrateDepth}</span>
          </div>
          <div className={formCell}>
            <span className={label}>NUMBER OF FRY</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.count}</span>
          </div>
        </div>

        <div className={formCell}>
          <span className={cn(label, "min-w-30")}>FOODS</span>
          <span className={valueText}>{formData.foods?.join(", ")}</span>
        </div>

        <div className={formCell}>
          <span className={cn(label, "min-w-30")}>SPAWN LOCATIONS</span>
          <span className={valueText}>{formData.spawnLocations?.join(", ")}</span>
        </div>

        <div className='flex mt-4'>
          <div className={formCell}>
            <span className={cn(label)}>WITNESSED BY</span>
          </div>
          <div className={formCell}>
            <span className={cn(label)}>DATE</span>
          </div>
        </div>

      </div>
    </div >
  );

};

export default PrintPage;
