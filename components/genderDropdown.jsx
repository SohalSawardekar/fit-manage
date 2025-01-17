import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@components/ui/select";
import { Label } from "@components/ui/label";
import { Slider } from "@components/ui/slider";

const GenderDropdownWithSlider = ({ userDetails, handleInputChange }) => {
  const [gender, setGender] = useState(userDetails.gender || "");
  const [sliderValue, setSliderValue] = useState(50);

  const handleGenderChange = (value) => {
    setGender(value)
    handleInputChange({ target: { name: "gender", value } });
  };

  return (
    <div className="space-y-4">
      {/* Gender Dropdown */}
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select onValueChange={handleGenderChange} value={gender}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            {/* <SelectItem value="other">Customized</SelectItem> */}
          </SelectContent>
        </Select>
      </div>

      {/* Slider for "Other" Option */}
      {gender === "other" && (
        <div className="space-y-2">
          <Label htmlFor="gender-slider">Specify Preference</Label>
          <Slider
            value={[sliderValue]}
            onValueChange={(value) => setSliderValue(value[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Male: {100 - sliderValue}%</span>
            <span>Female: {sliderValue}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenderDropdownWithSlider;
