import { useEffect } from 'react';
import { useFormContext } from './FormContext';
import { useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';
import { isLivestock } from './Schema';

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

        <span className='font-extralight text-xs m-2'>
          For Coral & Plants fill out the section below as well
        </span>

        <div className={formCell}>
          <span className={cn(label, "min-w-44")}>PROPAGATION METHOD USED:</span>
          <span className={valueText}>{formData.propagationMethod}</span>
        </div>
        <div className={formCell}>
          <span className={cn(label, "min-w-44")}>TYPE OF LIGHTING USED:</span>
          <span className={valueText}>{formData.lightType}</span>
        </div>
        <div className='flex'>
          <div className={formCell}>
            <span className={label}>TOTAL LIGHTING WATTAGE</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.lightStrength}</span>
          </div>
          <div className={formCell}>
            <span className={label}># OF HOURS ILLUMINATED</span>
          </div>
          <div className={formCell}>
            <span className={valueText}>{formData.lightHours}</span>
          </div>
        </div>

        <div className="flex w-full mt-1 mb-1">
          <div className="w-4" />
          <span className={cn("text-center", "text-xs", "flex-1", "font-extralight")}>FERTILIZERS AND SUPPLIMENTS USED (IF ANY)</span>
          <span className={cn("text-center", "text-xs", "flex-1", "font-extralight")}>HOW MUCH / HOW OFTEN</span>
        </div>

        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <div className="flex w-full">
            <div className="border border-black h-6 w-4 flex items-center justify-center">
              <span className='text-center'>{index + 1}</span>
            </div>
            <div className={formCell}>
              <span className={cn("ml-2", valueText)}>{formData.ferts?.[index]?.substance || ""}</span>
            </div>
            <div className={formCell}>
              <span className={cn("ml-2", valueText)}>{formData.ferts?.[index]?.regimen || ""}</span>
            </div>
          </div>))
        }
        <div className={formCell}>
          <span className={cn(label, "min-w-40")}> USING CARBON ENRICHMENT?: </span>
          <span className={valueText}>{!isLivestock(formData.speciesType) && formData.CO2}</span>
          <span className={cn(valueText, "ml-4")}>{formData.CO2Description}</span>
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
    </div>
  );

};

export default PrintPage;
