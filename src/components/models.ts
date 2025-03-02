import { Row } from "./db";

export interface VoiceNote {
  recordDataBase64: string,
  msDuration: number,
  mimeType: string
}

export class Exercise extends Row {
  public description?: string
  public name?: string
  public voiceNote?: VoiceNote
}

export class WorkoutPlan extends Row {
  public name?: string
  public location: {
    lon: number,
    lat: number
  } = {
    lon: 0,
    lat: 0
  }
  public includedWorkouts: Workout[] = []

  public cleanseWorkouts() {
    this.includedWorkouts = this.includedWorkouts.filter(workout => {
      return workout.exerciseId !== undefined && Exercise.get(workout.exerciseId) !== undefined;
    });
  }
}

export class Workout extends Row {
  public reps?: number
  public sets?: number
  public exerciseId?: number

  public exercise = () => {
    return Exercise.create({...Exercise.get(this.exerciseId as number)}, false)
  }

}
