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

        {
          [
            ["TANK SIZE", formData.tankSize, "SUBSTRATE COLOR", formData.substrateColor],
            ["FILTER TYPE", formData.filterType, "TEMPERATURE", formData.temperature],
            ["WATER CHANGE VOLUME", formData.changeVolume, "pH", formData.pH],
            ["WATER CHANGE FREQUENCY", formData.changeFrequency, "HARDNESS (GH)", formData.GH],
            ["SUBSTRATE TYPE", formData.substrateType, "SPECIFIC GRAVITY (SP.G.)", formData.specificGravity],
            ["SUBSTRATE DEPTH", formData.substrateDepth, "NUMBER OF FRY", formData.count],
          ].map((v) => <div className='flex'>
            <div className={formCell}>
              <span className={label}>{v[0]}</span>
            </div>
            <div className={formCell}>
              <span className={valueText}>{v[1]}</span>
            </div>
            <div className={formCell}>
              <span className={label}>{v[2]}</span>
            </div>
            <div className={formCell}>
              <span className={valueText}>{v[3]}</span>
            </div>
          </div>)
        }

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

        <div className="bg-indigo-200">
          {
            [
              ["ARTICLE SUBMITTED", "# OF PAGES"],
              ["FIRST TIME BAS SPAWN", "FLOWERED"],
              ["RE-VISITED BY", "DATE"],
              ["CERTIFICATE #", "POINTS"],
              ["DATE PRESENTED", "BAP CHAIRPERSON"],
            ].map((v) => <div className='flex'>
              <div className={formCell}>
                <span className={label}>{v[0]}</span>
              </div>
              <div className={formCell} />

              <div className={formCell}>
                <span className={label}>{v[1]}</span>
              </div>
              <div className={formCell} />
            </div>
            )
          }
        </div>

      </div>
    </div >
  );

};

export default PrintPage;
