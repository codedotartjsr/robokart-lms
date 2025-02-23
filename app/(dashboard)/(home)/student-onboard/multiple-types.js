// "use client";
// import React from "react";
// import { Stepper, Step, StepLabel } from "@/components/ui/steps";
// import { toast } from "@/components/ui/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// const VStepForm = () => {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const steps = [
//     {
//       label: "Account Details",
//       content: "Set up your account details",
//     },
//     {
//       label: "Personal Info",
//       content: "Add your personal info",
//     },
//     {
//       label: "Social Links",
//       content: "Add your social links",
//     },
//   ];

//   const isStepOptional = (step) => {
//     return step === 1;
//   };

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       throw new Error("You can't skip a step that isn't optional.");
//     }
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   const onSubmit = () => {
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 top-0 right-0">
//           <p className="text-primary-foreground">Done</p>
//         </div>
//       ),
//     });
//   };

//   return (
//     <div className="grid grid-cols-12">
//       <div className="xl:col-span-3 col-span-12">
//         <Stepper current={activeStep} direction="vertical">
//           {steps.map((label, index) => {
//             const stepProps = {};
//             const labelProps = {};
//             if (isStepOptional(index)) {
//               labelProps.optional = (
//                 <StepLabel variant="caption">Optional</StepLabel>
//               );
//             }
//             return (
//               <Step key={label} {...stepProps}>
//                 <StepLabel {...labelProps}>
//                   <div className="flex flex-col">
//                     <span> {label.label}</span>
//                     <span> {label.content}</span>
//                   </div>
//                 </StepLabel>
//               </Step>
//             );
//           })}
//         </Stepper>
//       </div>
//       <div className="col-span-12 xl:col-span-9">
//         {activeStep === steps.length ? (
//           <React.Fragment>
//             <div className="mt-2 mb-2 font-semibold text-center">
//               All steps completed - you&apos;re finished
//             </div>
//             <div className="flex pt-2">
//               <div className=" flex-1" />
//               <Button
//                 size="xs"
//                 variant="outline"
//                 color="destructive"
//                 className="cursor-pointer"
//                 onClick={handleReset}
//               >
//                 Reset
//               </Button>
//             </div>
//           </React.Fragment>
//         ) : (
//           <React.Fragment>
//             <form>
//               <div className="grid grid-cols-12 gap-4">
//                 {activeStep === 0 && (
//                   <>
//                     <div className="col-span-12 ">
//                       <h4 className="text-sm font-medium text-default-600">
//                         Enter Your Account Details
//                       </h4>
//                       <p className="text-xs text-default-600 mt-1">
//                         Fill in the box with correct data
//                       </p>
//                     </div>
//                     <div className="col-span-12 lg:col-span-6">
//                       <Input type="text" placeholder="Username" />
//                     </div>
//                     <div className="col-span-12 lg:col-span-6">
//                       <Input type="email" placeholder="Email Address" />
//                     </div>
//                     <div className="col-span-12 lg:col-span-6">
//                       <Input type="password" placeholder="Password" />
//                     </div>
//                     <div className="col-span-12 lg:col-span-6">
//                       <Input type="password" placeholder="Confirm Password" />
//                     </div>
//                   </>
//                 )}
//                 {activeStep === 1 && (
//                   <>
//                     <div className="col-span-12 ">
//                       <h4 className="text-sm font-medium text-default-600">
//                         Enter Your Personal Info
//                       </h4>
//                       <p className="text-xs text-default-600 mt-1">
//                         Fill in the box with correct data
//                       </p>
//                     </div>
//                     <div className="col-span-12 lg:col-span-6">
//                       <Input type="text" placeholder="First Name" />
//                     </div>
//                     <div className="col-span-12 lg:col-span-6">
//                       <Input type="text" placeholder="Last Name" />
//                     </div>
//                     <div className="col-span-12 lg:col-span-4">
//                       <Input type="number" placeholder="Phone number" />
//                     </div>
//                     <div className="col-span-12 lg:col-span-4">
//                       <Input type="number" placeholder="Your age" />
//                     </div>

//                     <div className="col-span-12 lg:col-span-4">
//                       <Select>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Language" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="english">English</SelectItem>
//                           <SelectItem value="french">French</SelectItem>
//                           <SelectItem value="spanish">Spanish</SelectItem>
//                           <SelectItem value="arabic">Arabic</SelectItem>
//                           <SelectItem value="bangla">Bangla</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </>
//                 )}

//                 {activeStep === 2 && (
//                   <>
//                     <div className="col-span-12 ">
//                       <h4 className="text-sm font-medium text-default-600">
//                         Enter Your Social Links
//                       </h4>
//                       <p className="text-xs text-default-600 mt-1">
//                         Fill in the box with correct data
//                       </p>
//                     </div>
//                     <div className="col-span-12 lg:col-span-6">
//                       <Input
//                         type="text"
//                         placeholder="http://facebook.com/abc"
//                       />
//                     </div>
//                     <div className="col-span-12 lg:col-span-6">
//                       <Input type="text" placeholder="http://twitter.com/abc" />
//                     </div>
//                     <div className="col-span-12 lg:col-span-6">
//                       <Input
//                         type="text"
//                         placeholder="http://linkedin.com/abc"
//                       />
//                     </div>
//                     <div className="col-span-12 lg:col-span-6">
//                       <Input type="text" placeholder="http://youtube.com/abc" />
//                     </div>
//                     <div className="col-span-12 lg:col-span-6">
//                       <Input
//                         type="text"
//                         placeholder="http://instagram.com/abc"
//                       />
//                     </div>
//                   </>
//                 )}
//               </div>
//             </form>

//             <div className="flex pt-2 ">
//               <Button
//                 size="xs"
//                 variant="outline"
//                 color="secondary"
//                 className={cn("cursor-pointer", {
//                   hidden: activeStep === 0,
//                 })}
//                 onClick={handleBack}
//                 sx={{ mr: 1 }}
//               >
//                 Back
//               </Button>
//               <div className="flex-1	gap-4 " />
//               <div className="flex	gap-2 ">
//                 {activeStep === steps.length - 1 ? (
//                   <Button
//                     size="xs"
//                     variant="outline"
//                     color="success"
//                     className="cursor-pointer"
//                     onClick={() => {
//                       if (onSubmit) onSubmit();
//                       handleNext();
//                     }}
//                   >
//                     Submit
//                   </Button>
//                 ) : (
//                   <Button
//                     size="xs"
//                     variant="outline"
//                     color="secondary"
//                     className="cursor-pointer"
//                     onClick={handleNext}
//                   >
//                     Next
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </React.Fragment>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VStepForm;





"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

import BasicSelect from "./basic-select";
import ReactSelectOption from "./react-select-options";

const schema = z.object({
  student: z
    .string()
    .min(3, { message: "Student name must be at least 3 charecters." })
    .max(30, { message: "The student's name must not exceed 30 characters." }),
  phone: z.string().refine((value) => value.length === 10, {
    message: "Phone number must be exactly 10 characters long.",
  }),
  city: z.string().min(3, { message: "Enter minimum 3 charecters" }),
  web: z.string().url({ message: "Enter valid Email address" }),
  inputMessage: z
    .string()
    .max(30, { message: "Message should not be exceed 30 charecters." }),
  state: z.string().min(1, { message: "State is required." }),
  district: z.string().min(1, { message: "District is required." }),
  school: z.string().min(1, { message: "School is required." }),
  udise: z.string().min(3, { message: "UDISE must be at least 3 characters." }),
  selectCourses: z.string().min(1, { message: "Please select at least one course." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const MultipleTypes = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-primary-foreground">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="student"
            className={cn("", {
              "text-destructive": errors.student,
            })}
          >
            Student Name
          </Label>
          <Input
            type="text"
            {...register("student")}
            placeholder="Student name 3 to 8 charecters"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.student,
            })}
          />
          {errors.student && (
            <p
              className={cn("text-xs", {
                "text-destructive": errors.student,
              })}
            >
              {errors.student.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="phone"
            className={cn("", {
              "text-destructive": errors.phone,
            })}
          >
            Phone Number
          </Label>
          <Input
            type="number"
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
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="city"
            className={cn("", {
              "text-destructive": errors.city,
            })}
          >
            City
          </Label>
          <Input
            type="text"
            placeholder="enter minimum 3 charecters"
            {...register("city")}
            className={cn("", {
              "border-destructive": errors.city,
            })}
          />
          {errors.city && (
            <p className="text-xs text-destructive">{errors.city.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="web"
            className={cn("", {
              "text-destructive": errors.web,
            })}
          >
            Email Address
          </Label>
          <Input
            type="text"
            {...register("web")}
            placeholder="enter valid email address"
            className={cn("", {
              "border-destructive focus:border-destructive": errors.web,
            })}
          />
          {errors.web && (
            <p className="text-xs text-destructive">{errors.web.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="state"
            className={cn("", {
              "text-destructive": errors.state,
            })}
          >
            State
          </Label>
          <BasicSelect {...register("state")} />
          {errors.state && (
            <p className="text-xs text-destructive">{errors.state.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="district"
            className={cn("", {
              "text-destructive": errors.district,
            })}
          >
            District
          </Label>
          <BasicSelect {...register("district")} />
          {errors.district && (
            <p className="text-xs text-destructive">{errors.district.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="school"
            className={cn("", {
              "text-destructive": errors.school,
            })}
          >
            School
          </Label>
          <BasicSelect {...register("school")} />
          {errors.school && (
            <p className="text-xs text-destructive">{errors.school.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="udise"
            className={cn("", {
              "text-destructive": errors.udise,
            })}
          >
            UDISE
          </Label>
          <Input
            type="text"
            placeholder="enter minimum 3 charecters"
            {...register("udise")}
            className={cn("", {
              "border-destructive": errors.udise,
            })}
          />
          {errors.udise && (
            <p className="text-xs text-destructive">{errors.udise.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="selectCourses"
            className={cn("", {
              "text-destructive": errors.selectCourses,
            })}
          >
            Select Courses
          </Label>
          {/* <BasicSelect /> */}
          <ReactSelectOption {...register("selectCourses")} />
          {errors.selectCourses && (
            <p className="text-xs text-destructive">{errors.selectCourses.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className={cn("", {
              "text-destructive": errors.password,
            })}
          >
            Password
          </Label>
          <Input
            type="text"
            placeholder="Enter at least 6 characters"
            {...register("password")}
            className={cn("", {
              "border-destructive": errors.password,
            })}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="inputMessage"
            className={cn("", {
              "text-destructive": errors.inputMessage,
            })}
          >
            Message
          </Label>
          <Textarea
            {...register("inputMessage")}
            placeholder="type here... maximum 30 charecters"
            id="inputMessage"
            className={cn("", {
              "border-destructive focus:border-destructive":
                errors.inputMessage,
            })}
          />
          {errors.inputMessage && (
            <p className="text-xs text-destructive">
              {errors.inputMessage.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-2">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default MultipleTypes;