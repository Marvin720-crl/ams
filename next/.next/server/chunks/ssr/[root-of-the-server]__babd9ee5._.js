module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/utils/storage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Storage utilities for managing user data, subjects, and enrollments
__turbopack_context__.s([
    "addAttendance",
    ()=>addAttendance,
    "addEnrollment",
    ()=>addEnrollment,
    "addSubject",
    ()=>addSubject,
    "addUser",
    ()=>addUser,
    "clearCurrentUserIdFromStorage",
    ()=>clearCurrentUserIdFromStorage,
    "getAttendances",
    ()=>getAttendances,
    "getCurrentUserIdFromStorage",
    ()=>getCurrentUserIdFromStorage,
    "getEnrollments",
    ()=>getEnrollments,
    "getSubjects",
    ()=>getSubjects,
    "getUserById",
    ()=>getUserById,
    "getUsers",
    ()=>getUsers,
    "loginUser",
    ()=>loginUser,
    "saveAttendances",
    ()=>saveAttendances,
    "saveEnrollments",
    ()=>saveEnrollments,
    "saveSubjects",
    ()=>saveSubjects,
    "saveUsers",
    ()=>saveUsers,
    "setCurrentUserIdInStorage",
    ()=>setCurrentUserIdInStorage,
    "updateAttendance",
    ()=>updateAttendance,
    "updateEnrollment",
    ()=>updateEnrollment,
    "updateUser",
    ()=>updateUser
]);
const isServer = "undefined" === 'undefined';
const getUsers = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
    const users = undefined;
};
const saveUsers = (users)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const addUser = (user)=>{
    const users = getUsers();
    users.push(user);
    saveUsers(users);
};
const getUserById = (id)=>{
    const users = getUsers();
    return users.find((u)=>u.id === id);
};
const updateUser = (id, updates)=>{
    const users = getUsers();
    const index = users.findIndex((u)=>u.id === id);
    if (index !== -1) {
        users[index] = {
            ...users[index],
            ...updates
        };
        saveUsers(users);
    }
};
const getSubjects = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
    const subjects = undefined;
};
const saveSubjects = (subjects)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const addSubject = (subject)=>{
    const subjects = getSubjects();
    subjects.push(subject);
    saveSubjects(subjects);
};
const getEnrollments = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
    const enrollments = undefined;
};
const saveEnrollments = (enrollments)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const addEnrollment = (enrollment)=>{
    const enrollments = getEnrollments();
    enrollments.push(enrollment);
    saveEnrollments(enrollments);
};
const updateEnrollment = (id, updates)=>{
    const enrollments = getEnrollments();
    const index = enrollments.findIndex((e)=>e.id === id);
    if (index !== -1) {
        enrollments[index] = {
            ...enrollments[index],
            ...updates
        };
        saveEnrollments(enrollments);
    }
};
const getAttendances = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
    const attendances = undefined;
};
const saveAttendances = (attendances)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const addAttendance = (attendance)=>{
    const attendances = getAttendances();
    attendances.push(attendance);
    saveAttendances(attendances);
};
const updateAttendance = (id, updates)=>{
    const attendances = getAttendances();
    const index = attendances.findIndex((a)=>a.id === id);
    if (index !== -1) {
        attendances[index] = {
            ...attendances[index],
            ...updates
        };
        saveAttendances(attendances);
    }
};
const getCurrentUserIdFromStorage = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
};
const setCurrentUserIdInStorage = (userId)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const clearCurrentUserIdFromStorage = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const loginUser = (id, password)=>{
    if (id === 'admin' && password === 'ADMIN@2026') {
        const adminUser = {
            id: 'admin',
            name: 'System Administrator',
            email: 'admin@school.edu',
            password: 'ADMIN@2026',
            role: 'admin'
        };
        setCurrentUserIdInStorage('admin');
        return adminUser;
    }
    const users = getUsers();
    const user = users.find((u)=>u.id === id && u.password === password);
    if (user) {
        setCurrentUserIdInStorage(user.id);
        return user;
    }
    return null;
};
}),
"[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/storage.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const currentUserId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUserIdFromStorage"])();
        if (currentUserId) {
            if (currentUserId === 'admin') {
                setUser({
                    id: 'admin',
                    name: 'System Administrator',
                    email: 'admin@school.edu',
                    password: 'ADMIN@2026',
                    role: 'admin'
                });
            } else {
                const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserById"])(currentUserId);
                if (currentUser) {
                    setUser(currentUser);
                }
            }
        }
    }, []);
    const login = (user)=>{
        setUser(user);
    };
    const logout = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearCurrentUserIdFromStorage"])();
        setUser(null);
    };
    const updateCurrentUser = (updates)=>{
        if (user) {
            setUser({
                ...user,
                ...updates
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            login,
            logout,
            updateCurrentUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useAuth = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__babd9ee5._.js.map