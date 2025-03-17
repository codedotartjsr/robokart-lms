"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import BasicSelect from "./basic-select";
import { Icon } from '@iconify/react';
import { useState, useEffect } from "react";
import config from "@/config/config";

const schema = z.object({
    studentName: z.string().min(1, "Required").max(30),
    fatherName: z.string().min(1, "Required").max(30),
    phone: z.string().length(10, "Must be 10 digits"),
    email: z.string().email("Must be a valid email"),
    password: z.string().min(1, "Required"),
    gender: z.enum(["male", "female", "others"], "Gender is required"),
    state: z.string().min(1, "Required").max(30),
    district: z.string().min(1, "Required").max(30),
    aadhar: z.string().min(1, "Required").max(30),
    studentClass: z.string().min(1, "Required").max(30),
    dob: z.string().min(1, "Required").max(30),
  });

const MultipleTypes = ({ onAdded }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [schoolId, setSchoolId] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlSchoolId = urlParams.get('schoolId');
    const localUserData = localStorage.getItem('user');
    const user = localUserData ? JSON.parse(localUserData) : null;

    if (urlSchoolId) {
        setSchoolId(urlSchoolId);
    } else if (user && user.school && user.school._id) {
        setSchoolId(user.school._id);
    }
}, []);
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

const onSubmit = async (data) => {
    console.log("data", data);

    const payload = {
        studentName: data.studentName,
        fatherName: data.fatherName,
        phoneNumber: data.phone,
        email: data.email,
        password: data.password,
        gender: data.gender,
        school: schoolId,
        state: data.state,
        district: data.district,
        aadhar: data.aadhar,
        studentClass: data.studentClass,
        dob: data.dob
    };
    
    try {
      const response = await fetch(`${config.API_BASE_URL}/v1/student/addStudent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("New Principal Registered Successfully");
        reset();
        onAdded();
      } else {
        throw new Error(result.message || "Failed to add principal");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during submission");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-2">
        <div className="flex flex-col gap-2 mb-2 lg:mr-4">
          <Label
            htmlFor="studentName"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.studentName,
            })}
          >
            Student Name
          </Label>
          <Input
            type="text"
            size="lg"
            {...register("studentName")}
            placeholder="Please enter your name"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.studentName,
            })}
          />
          {errors.studentName && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.studentName,
              })}
            >
              {errors.studentName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:ml-4">
          <Label
            htmlFor="fatherName"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.fatherName,
            })}
          >
            Father Name
          </Label>
          <Input
            type="text"
            size="lg"
            {...register("fatherName")}
            placeholder="Please enter father name"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.fatherName,
            })}
          />
          {errors.fatherName && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.fatherName,
              })}
            >
              {errors.fatherName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:mr-4">
          <Label
            htmlFor="phone"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.phone,
            })}
          >
            Phone Number
          </Label>
          <Input
            type="number"
            size="lg"
            placeholder="10 charecters phone number"
            {...register("phone")}
            className={cn("", {
              "border-destructive focus:border-destructive": errors.phone,
            })}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:ml-4">
          <Label
            htmlFor="email"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.email,
            })}
          >
            Email Address
          </Label>
          <Input
            type="email"
            size="lg"
            {...register("email")}
            placeholder="enter valid email address"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.email,
            })}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:mr-4">
          <Label
            htmlFor="aadhar"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.aadhar,
            })}
          >
            Aadhar Number
          </Label>
          <Input
            type="text"
            size="lg"
            {...register("aadhar")}
            placeholder="Please enter aadhar no"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.aadhar,
            })}
          />
          {errors.aadhar && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.aadhar,
              })}
            >
              {errors.aadhar.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:ml-4">
          <Label
            htmlFor="studentClass"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.studentClass,
            })}
          >
            Class Name
          </Label>
          <Input
            type="text"
            size="lg"
            {...register("studentClass")}
            placeholder="Please enter your class"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.studentClass,
            })}
          />
          {errors.studentClass && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.studentClass,
              })}
            >
              {errors.studentClass.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:mr-4">
          <Label
            htmlFor="dob"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.dob,
            })}
          >
            Date of Birth
          </Label>
          <Input
            type="date"
            size="lg"
            {...register("dob")}
            placeholder="Please enter your class"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.dob,
            })}
          />
          {errors.dob && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.dob,
              })}
            >
              {errors.dob.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:ml-4">
          <Label
            htmlFor="gender"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.gender,
            })}
          >
            Gender
          </Label>
          {/* <BasicSelect {...register("gender")} /> */}
          <BasicSelect control={control} name="gender" />

          {errors.gender && (
            <p className="text-xs text-destructive">{errors.gender.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:mr-4">
          <Label
            htmlFor="state"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.state,
            })}
          >
            State
          </Label>
          <Input
            type="text"
            size="lg"
            {...register("state")}
            placeholder="Please enter your state"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.state,
            })}
          />
          {errors.state && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.state,
              })}
            >
              {errors.state.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:ml-4">
          <Label
            htmlFor="district"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.district,
            })}
          >
            District
          </Label>
          <Input
            type="text"
            size="lg"
            {...register("district")}
            placeholder="Please enter your district"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.district,
            })}
          />
          {errors.district && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.district,
              })}
            >
              {errors.district.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 lg:mr-4">
          <Label
            htmlFor="password"
            className={cn("mb-1 ml-1", {
              "text-destructive": errors.password,
            })}
          >
            Password
          </Label>
          <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            size="lg"
            placeholder="Please enter valid password"
            {...register("password")}
            className={cn("", {
              "border-destructive": errors.password,
            })}
          />
          <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={togglePasswordVisibility}
            >
              <Icon icon={showPassword ? "heroicons-outline:eye-off" : "heroicons-outline:eye"} className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

      </div>
      <div className="mt-4 mt-2 mb-2 ml-1">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default MultipleTypes;