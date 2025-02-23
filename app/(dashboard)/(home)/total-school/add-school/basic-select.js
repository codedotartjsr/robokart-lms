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
      <SelectTrigger size="md">
        <SelectValue placeholder="Select Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="abc">ABC</SelectItem>
        <SelectItem value="xyz">XYZ</SelectItem>
        <SelectItem value="pqr">PQR</SelectItem>
      </SelectContent>
    </Select>
  );
};
export default BasicSelect;