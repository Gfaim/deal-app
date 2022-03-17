import { Static, Type } from '@sinclair/typebox'

const DealSchema = Type.Object({
    id: Type.Optional(Type.String()),
    label: Type.String(),
    amount: Type.Number(),
    date: Type.String({ format: 'date-time' }),
    detail: Type.Optional(Type.String())
});

type RemoveId<T> = Omit<T, "id">

type Deal = Static<typeof DealSchema>

export { DealSchema };
export type { Deal, RemoveId };