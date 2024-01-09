export default class Company {
  private company_id: number;
  private name: string;
  private plan_id: number;
  private plan_timestamp: number;
  private created_at: number;

  constructor(
    company_id: number,
    name: string,
    plan_id: number,
    plan_timestamp: number,
    created_at: number
  ) {
      this.company_id = company_id;
      this.name = name;
      this.plan_id = plan_id;
      this.plan_timestamp = plan_timestamp;
      this.created_at = created_at;
  }

  getId(): number {
      return this.company_id;
  }

  getName(): string {
      return this.name;
  }

  setName(name: string): void {
      this.name = name;
  }

  getPlanId(): number {
    return this.plan_id;
  }

  setPlanId(planId: number): void {
    this.plan_id = planId;
  }

  getPlanTimestamp(): number {
    return this.plan_timestamp;
  }

  setPlanTimestamp(timestamp: number): void {
    this.plan_timestamp = timestamp;
  }

  getCreatedAt(): number {
    return this.created_at;
  }

  setCreatedAt(created_at: number): void {
    this.created_at = created_at;
  }
}
