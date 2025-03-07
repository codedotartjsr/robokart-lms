"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useController } from "react-hook-form";

const BasicSelect = ({ control, name }) => {
  const {
    field: { ref, value, onChange },
    fieldState: { error }
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <Select ref={ref} value={value} onValueChange={onChange}>
      <SelectTrigger size="lg">
        <SelectValue placeholder="Select Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="male">Male</SelectItem>
        <SelectItem value="female">Female</SelectItem>
        <SelectItem value="others">Others</SelectItem>
      </SelectContent>
    </Select>
  );
};
export default BasicSelect;