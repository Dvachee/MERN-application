import { useRouter } from "../hooks/router.hook"

export const RedirectConfig = {
    students: '/students',
    teachers: (id?: number) => `/teachers` + `/${id}`,
    accounts: (id: number) => `/accounts/${id}`,
    cources: (id?: number) => `/cources` + `/${id}`,
    lessons: (id?: number) => `/lessons` + `/${id}`,
}

export const RedirectHandler = (route: string) => {
    const router = useRouter();
    return router.history.push(route);
}