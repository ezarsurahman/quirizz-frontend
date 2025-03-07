import { Input } from "@/components/ui/input";
import { InputDropdown } from "../create/components/InputDropdown";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { categories, difficulties } from "../create/components/constant";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { SearchAndFilterInterface } from "./interface";

export const SearchAndFilter = ({onChange}:SearchAndFilterInterface) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [date, setDate] = useState<DateRange | undefined>();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };

    const handleDifficultyChange = (value: string) => {
        setSelectedDifficulty(value);
    };

    useEffect(() => {
        console.log(date)
        onChange(searchKeyword,selectedCategory,selectedDifficulty,date)
    },[searchKeyword,selectedCategory,selectedDifficulty,date])

    return (  
        <div className="flex flex-row mb-3 justify-between items-center w-full gap-3">
            <Input 
            placeholder="Search a keyword" 
            onChange={handleSearchChange}
            className="focus-visible:ring-mainpink flex-2"/>
            <InputDropdown 
            options={categories} 
            title="Category" 
            onChange={handleCategoryChange}
            className="font-semibold flex-1"/>
            <InputDropdown 
            options={difficulties} 
            title="Difficulty" 
            onChange={handleDifficultyChange}
            className="font-semibold flex-1"/>
            <DatePickerWithRange
            date={date}
            setDate={setDate}
            />
        </div>
    );
}
 
