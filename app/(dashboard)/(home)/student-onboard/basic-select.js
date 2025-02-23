"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const BasicSelect = () => {
  return (
    <Select>
      <SelectTrigger size="md">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">ABC</SelectItem>
        <SelectItem value="mathmatics">ABC</SelectItem>
        <SelectItem value="physics">ABC</SelectItem>
        <SelectItem value="chemistry">ABC</SelectItem>
        <SelectItem value="biology">ABC</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default BasicSelect;
