"use client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";

const formSchema = z.object({
  age: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  ethnicity: z.string().min(1, "Required"),
  hypertension: z.boolean(),
  coronaryArteryDisease: z.boolean(),
  asthma: z.boolean(),
  copd: z.boolean(),
  diabetesType1: z.boolean(),
  diabetesType2: z.boolean(),
  depression: z.boolean(),
  anxietyDisorder: z.boolean(),
  heartDisease: z.boolean(),
  respiratoryIssues: z.boolean(),
  diabetes: z.boolean(),
  mentalHealth: z.boolean(),
  glucoseMax: z.boolean(),
  cardioPlus: z.boolean(),
  asthmaRelief: z.boolean(),
  hypertonic: z.boolean(),
  breathEase: z.boolean(),
  moodStabilizer: z.boolean(),
  calmX: z.boolean(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<FormSchemaType>({
    defaultValues: {
      age: "",
      gender: "",
      ethnicity: "",
      hypertension: false,
      coronaryArteryDisease: false,
      asthma: false,
      copd: false,
      diabetesType1: false,
      diabetesType2: false,
      depression: false,
      anxietyDisorder: false,
      heartDisease: false,
      respiratoryIssues: false,
      diabetes: false,
      mentalHealth: false,
      glucoseMax: false,
      cardioPlus: false,
      asthmaRelief: false,
      hypertonic: false,
      breathEase: false,
      moodStabilizer: false,
      calmX: false,
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="container py-16">
      <form
        onSubmit={handleSubmit(async (data) => {
          console.log("data ", data);
          await new Promise((resolve) => setTimeout(resolve, 3000));
        })}
        className="grid grid-cols-3 gap-8 max-sm:grid-cols-1"
      >
        <Controller
          control={control}
          name="age"
          render={({ field, fieldState }) =>
            (
              <Input
                label="Age"
                type="number"
                ref={field.ref}
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            ) as any
          }
        />

        <Controller
          control={control}
          name="gender"
          render={({ field, fieldState }) =>
            (
              <Select
                label="Gender"
                ref={field.ref}
                name={field.name}
                selectedKeys={[field.value]}
                onSelectionChange={(keys) => field.onChange(Array.from(keys)[0] ?? "")}
                onBlur={field.onBlur}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              >
                {["Male", "Female"].map((key) => (
                  <SelectItem key={key}>{key}</SelectItem>
                ))}
              </Select>
            ) as any
          }
        />

        <Controller
          control={control}
          name="ethnicity"
          render={({ field, fieldState }) =>
            (
              <Select
                label="Ethnicity"
                ref={field.ref}
                name={field.name}
                selectedKeys={[field.value]}
                onSelectionChange={(keys) => field.onChange(Array.from(keys)[0] ?? "")}
                onBlur={field.onBlur}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              >
                {["African American", "Asian", "Caucasian", "Hispanic", "Other"].map((key) => (
                  <SelectItem key={key}>{key}</SelectItem>
                ))}
              </Select>
            ) as any
          }
        />

        {[
          { name: "hypertension", label: "Hypertension" },
          { name: "coronaryArteryDisease", label: "Coronary Artery Disease" },
          { name: "asthma", label: "Asthma" },
          { name: "copd", label: "COPD" },
          { name: "diabetesType1", label: "Diabetes Type 1" },
          { name: "diabetesType2", label: "Diabetes Type 2" },
          { name: "depression", label: "Depression" },
          { name: "anxietyDisorder", label: "Anxiety Disorder" },
          { name: "heartDisease", label: "Heart Disease" },
          { name: "respiratoryIssues", label: "Respiratory Issues" },
          { name: "diabetes", label: "Diabetes" },
          { name: "mentalHealth", label: "Mental Health" },
          { name: "glucoseMax", label: "Glucose Max" },
          { name: "cardioPlus", label: "Cardio Plus" },
          { name: "asthmaRelief", label: "Asthma Relief" },
          { name: "hypertonic", label: "Hypertonic" },
          { name: "breathEase", label: "Breath Ease" },
          { name: "moodStabilizer", label: "Mood Stabilizer" },
          { name: "calmX", label: "Calm X" },
        ].map(({ name, label }) => (
          <Controller
            key={name}
            control={control}
            name={name as any}
            render={({ field, fieldState }) =>
              (
                <Checkbox
                  ref={field.ref}
                  name={field.name}
                  isSelected={field.value}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  isInvalid={fieldState.invalid}
                >
                  {label}
                </Checkbox>
              ) as any
            }
          />
        ))}

        <div className="sm:col-span-3">
          <Button type="submit" color="primary" isLoading={isSubmitting} className="w-full">
            Predict
          </Button>
        </div>
      </form>

      {isSubmitSuccessful && !isSubmitting && (
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-primary underline">Prediction output:</h2>

          <div className="grid grid-cols-3 gap-8 pt-8 max-lg:grid-cols-1">
            {Object.keys(DUMMY_DATA[0]).map((key) => (
              <Card key={key} className="flex h-32 flex-col items-center justify-center">
                <h3 className="text-sm font-bold uppercase text-primary">{key}</h3>
                <p className="text-lg uppercase">{getRandomObject(DUMMY_DATA)[key].toString()}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const DUMMY_DATA = [
  { dizziness: true, fatigue: false, hypoglycemia: true, palpitations: false, confusion: true, fainting: false, severity: 3 },
  { dizziness: false, fatigue: true, hypoglycemia: false, palpitations: true, confusion: false, fainting: true, severity: 4 },
  { dizziness: true, fatigue: true, hypoglycemia: false, palpitations: false, confusion: true, fainting: false, severity: 2 },
  { dizziness: false, fatigue: false, hypoglycemia: true, palpitations: true, confusion: false, fainting: true, severity: 5 },
  { dizziness: true, fatigue: true, hypoglycemia: false, palpitations: false, confusion: true, fainting: false, severity: 1 },
  { dizziness: false, fatigue: true, hypoglycemia: true, palpitations: true, confusion: false, fainting: true, severity: 4 },
  { dizziness: true, fatigue: false, hypoglycemia: false, palpitations: true, confusion: true, fainting: false, severity: 3 },
  { dizziness: false, fatigue: true, hypoglycemia: true, palpitations: false, confusion: false, fainting: true, severity: 2 },
  { dizziness: true, fatigue: false, hypoglycemia: false, palpitations: true, confusion: true, fainting: false, severity: 5 },
  { dizziness: false, fatigue: true, hypoglycemia: true, palpitations: false, confusion: false, fainting: true, severity: 4 },
  { dizziness: true, fatigue: false, hypoglycemia: false, palpitations: true, confusion: true, fainting: false, severity: 3 },
  { dizziness: false, fatigue: true, hypoglycemia: true, palpitations: false, confusion: false, fainting: true, severity: 2 },
  { dizziness: true, fatigue: false, hypoglycemia: false, palpitations: true, confusion: true, fainting: false, severity: 5 },
  { dizziness: false, fatigue: true, hypoglycemia: true, palpitations: false, confusion: false, fainting: true, severity: 4 },
  { dizziness: true, fatigue: false, hypoglycemia: false, palpitations: true, confusion: true, fainting: false, severity: 3 },
  { dizziness: false, fatigue: true, hypoglycemia: true, palpitations: false, confusion: false, fainting: true, severity: 2 },
  { dizziness: true, fatigue: false, hypoglycemia: false, palpitations: true, confusion: true, fainting: false, severity: 5 },
  { dizziness: false, fatigue: true, hypoglycemia: true, palpitations: false, confusion: false, fainting: true, severity: 4 },
  { dizziness: true, fatigue: false, hypoglycemia: false, palpitations: true, confusion: true, fainting: false, severity: 3 },
  { dizziness: false, fatigue: true, hypoglycemia: true, palpitations: false, confusion: false, fainting: true, severity: 2 },
];

function getRandomObject<T extends object>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
