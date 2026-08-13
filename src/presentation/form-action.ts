/** Server Action を props で受け取るための型。コンポーネントは結線先を知らない */
export type FormAction = (formData: FormData) => void | Promise<void>;
