# Zod

TS 타입은 컴파일하면 사라지니, **"이 데이터가 진짜 이 타입 맞아?"를 런타임에 실제로 검사**해주는 스키마 검증 라이브러리.

```ts
const UserSchema = z.object({ id: z.number(), name: z.string() });
UserSchema.parse(data);   // 실제 값을 까보고 안 맞으면 그 자리에서 명확한 에러
```

## `z.infer`로 SoT가 되는 이유

스키마 하나를 원본으로 두면 **TS 타입(`z.infer`)도 런타임 검증(`.parse()`)도 둘 다 거기서 파생**된다.

```ts
type User = z.infer<typeof UserSchema>;   // 타입은 스키마에서 뽑음
```

→ 타입과 검증 로직을 손으로 따로 관리하다가 하나만 고치고 어긋나는 상황이 **구조적으로 불가능**해진다.

**관련:** [타입 단언 (`as`)](type-assertion.md)
**나온 곳:** [Nextree 타입스크립트](../reviews/2026-08-05-nextree-typescript.md)
