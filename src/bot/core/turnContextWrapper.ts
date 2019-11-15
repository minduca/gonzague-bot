import { Activity, ResourceResponse, TurnContext } from 'botbuilder';

export class TurnContextWrapper {
    constructor(private context: TurnContext) { }

    public sendActivity(activityOrText: string | Partial<Activity>, speak?: string, inputHint?: string): Promise<ResourceResponse | undefined> {
        return this.context.sendActivity(activityOrText, speak, inputHint);
    }

    public sendActivities(activities: Array<Partial<Activity>>): Promise<ResourceResponse[]> {
        return this.sendActivities(activities);
    }
}

export interface ActivitySender {
    sendActivity(activityOrText: string | Partial<Activity>, speak?: string, inputHint?: string): Promise<ResourceResponse | undefined>;
    sendActivities(activities: Array<Partial<Activity>>): Promise<ResourceResponse[]>;
}
