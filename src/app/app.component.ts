import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Nested FormArray Example Add Form Fields Dynamically';

  empForm: FormGroup;
  /*  Days: Array<any> = [
    { name: 'MONDAY', value: 'MONDAY' },
    { name: 'TUESDAY', value: 'TUESDAY' },
    { name: 'WEDNESDAY', value: 'WEDNESDAY' },
    { name: 'THURSDAY', value: 'THURSDAY' },
    { name: 'FRIDAY', value: 'FRIDAY' },
    { name: 'SATURDAY', value: 'SATURDAY' },
  ]; */

  Days: Array<any> = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];
  constructor(private fb: FormBuilder) {
    this.empForm = this.fb.group({
      employees: this.fb.array([]),
    });
  }

  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      skills: this.fb.array([]),
      day: this.fb.array([]),
    });
  }

  addEmployee() {
    console.log('Adding a employee');
    this.employees().push(this.newEmployee());
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }

  employeeSkills(empIndex: number): FormArray {
    return this.employees().at(empIndex).get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: '',
    });
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  employeeDays(empIndex: number): FormArray {
    return this.employees().at(empIndex).get('day') as FormArray;
  }

  newDays(): FormGroup {
    return this.fb.group({
      days: this.fb.array(this.Days.map((r) => this.fb.group(r))),
    });
  }

  addEmployeeDays(empIndex: number) {
    this.employeeDays(empIndex).push(this.newDays());
  }

  onSubmit() {
    console.log(this.empForm.value);
  }
}

export class country {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
