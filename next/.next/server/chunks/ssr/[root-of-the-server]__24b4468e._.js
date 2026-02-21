module.exports = [
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensureDbStructure",
    ()=>ensureDbStructure,
    "readDb",
    ()=>readDb,
    "saveProfileImage",
    ()=>saveProfileImage,
    "writeDb",
    ()=>writeDb
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'src/database');
const PROFILE_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public/profile');
async function ensureDbStructure() {
    try {
        // Ensure directories exist
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(DB_PATH, {
            recursive: true
        });
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(PROFILE_PATH, {
            recursive: true
        });
        const files = [
            'users.json',
            'subjects.json',
            'enrollments.json',
            'attendance.json'
        ];
        for (const file of files){
            const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DB_PATH, file);
            try {
                await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].access(filePath);
            } catch  {
                // Create empty array if file doesn't exist
                await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, JSON.stringify([]));
            }
        }
    } catch (error) {
        console.error('Error ensuring DB structure:', error);
    }
}
async function readDb(file) {
    await ensureDbStructure();
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DB_PATH, `${file}.json`);
    const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(filePath, 'utf-8');
    return JSON.parse(data);
}
async function writeDb(file, data) {
    await ensureDbStructure();
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DB_PATH, `${file}.json`);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, JSON.stringify(data, null, 2));
}
async function saveProfileImage(userId, base64Data) {
    await ensureDbStructure();
    // Extract file extension and actual base64 string
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) return null;
    const type = matches[1];
    const extension = type.split('/')[1] === 'jpeg' ? 'jpg' : type.split('/')[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const fileName = `${userId}.${extension}`;
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(PROFILE_PATH, fileName);
    // Remove any existing profile pics for this user (handle different extensions)
    try {
        const files = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readdir(PROFILE_PATH);
        for (const file of files){
            if (file.startsWith(`${userId}.`)) {
                await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].unlink(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(PROFILE_PATH, file));
            }
        }
    } catch (e) {
    // Directory might be empty, that's fine
    }
    // Write new file
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, buffer);
    // Return the public URL
    return `/profile/${fileName}?v=${Date.now()}`;
}
}),
"[project]/src/app/actions/dbActions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00195a8d56f1438da5ca72ef4146039081beb1ca52":"getSubjectsAction","0096451ed85f5ac9d34b7defc21c02708e0162bcd8":"getUsersAction","00d1c201bc8452e9931fc400486a0835ccf8531275":"getAttendancesAction","00e409f3fb00fefa105eade17c9be241127faa66f4":"getEnrollmentsAction","402cdba2fb2b3abaf5bf12d8191b77c1cdddf86efc":"deleteSubjectAction","4053901c7932ff0a506ceec0b85b281ffc75d7ca4c":"updateSubjectAction","406bc42788adea257d3fd5a2fdcb5904fd924448dc":"getUserByIdAction","408919691b757d427e0e98f7f6950029b002775bdb":"addEnrollmentAction","40a2fcd804db058a16761e2ec81eeadae5017df6ac":"addAttendanceAction","40b01aabb52840d1b31436c59737385563dfd7254e":"addSubjectAction","40f61a276cdfed2a3dff07b79341cf166e3cf2e5a9":"addUserAction","6019669db80b9e3cea05dddcfdb280432bc1b8f14d":"updateAttendanceAction","607d6c7ef6411e2f9b6b4c5f8e9f5d7ac25ef37c81":"updateUserAction","60cebf7ff9bb2c64cfa7a88759eb7b8b36e03fa114":"updateEnrollmentAction"},"",""] */ __turbopack_context__.s([
    "addAttendanceAction",
    ()=>addAttendanceAction,
    "addEnrollmentAction",
    ()=>addEnrollmentAction,
    "addSubjectAction",
    ()=>addSubjectAction,
    "addUserAction",
    ()=>addUserAction,
    "deleteSubjectAction",
    ()=>deleteSubjectAction,
    "getAttendancesAction",
    ()=>getAttendancesAction,
    "getEnrollmentsAction",
    ()=>getEnrollmentsAction,
    "getSubjectsAction",
    ()=>getSubjectsAction,
    "getUserByIdAction",
    ()=>getUserByIdAction,
    "getUsersAction",
    ()=>getUsersAction,
    "updateAttendanceAction",
    ()=>updateAttendanceAction,
    "updateEnrollmentAction",
    ()=>updateEnrollmentAction,
    "updateSubjectAction",
    ()=>updateSubjectAction,
    "updateUserAction",
    ()=>updateUserAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getUsersAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('users');
}
async function getUserByIdAction(id) {
    const users = await getUsersAction();
    return users.find((u)=>u.id === id) || null;
}
async function addUserAction(user) {
    const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('users');
    users.push(user);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('users', users);
    return user;
}
async function updateUserAction(id, updates) {
    const users = await getUsersAction();
    const index = users.findIndex((u)=>u.id === id);
    if (index !== -1) {
        if (updates.profilePic && updates.profilePic.startsWith('data:')) {
            const newPath = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveProfileImage"])(id, updates.profilePic);
            if (newPath) updates.profilePic = newPath;
        }
        users[index] = {
            ...users[index],
            ...updates
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('users', users);
        return users[index];
    }
    return null;
}
async function getSubjectsAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('subjects');
}
async function addSubjectAction(subject) {
    const subjects = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('subjects');
    subjects.push(subject);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('subjects', subjects);
    return subject;
}
async function updateSubjectAction(subject) {
    const subjects = await getSubjectsAction();
    const index = subjects.findIndex((s)=>s.id === subject.id);
    if (index !== -1) {
        subjects[index] = subject;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('subjects', subjects);
        return subjects[index];
    }
    return null;
}
async function deleteSubjectAction(subjectId) {
    let subjects = await getSubjectsAction();
    subjects = subjects.filter((s)=>s.id !== subjectId);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('subjects', subjects);
}
async function getEnrollmentsAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('enrollments');
}
async function addEnrollmentAction(enrollment) {
    const enrollments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('enrollments');
    enrollments.push(enrollment);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('enrollments', enrollments);
    return enrollment;
}
async function updateEnrollmentAction(id, updates) {
    const enrollments = await getEnrollmentsAction();
    const index = enrollments.findIndex((e)=>e.id === id);
    if (index !== -1) {
        enrollments[index] = {
            ...enrollments[index],
            ...updates
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('enrollments', enrollments);
        return enrollments[index];
    }
    return null;
}
async function getAttendancesAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('attendance');
}
async function addAttendanceAction(attendance) {
    const attendances = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('attendance');
    attendances.push(attendance);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('attendance', attendances);
    return attendance;
}
async function updateAttendanceAction(id, updates) {
    const attendances = await getAttendancesAction();
    const index = attendances.findIndex((a)=>a.id === id);
    if (index !== -1) {
        attendances[index] = {
            ...attendances[index],
            ...updates
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('attendance', attendances);
        return attendances[index];
    }
    return null;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getUsersAction,
    getUserByIdAction,
    addUserAction,
    updateUserAction,
    getSubjectsAction,
    addSubjectAction,
    updateSubjectAction,
    deleteSubjectAction,
    getEnrollmentsAction,
    addEnrollmentAction,
    updateEnrollmentAction,
    getAttendancesAction,
    addAttendanceAction,
    updateAttendanceAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUsersAction, "0096451ed85f5ac9d34b7defc21c02708e0162bcd8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserByIdAction, "406bc42788adea257d3fd5a2fdcb5904fd924448dc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addUserAction, "40f61a276cdfed2a3dff07b79341cf166e3cf2e5a9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUserAction, "607d6c7ef6411e2f9b6b4c5f8e9f5d7ac25ef37c81", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSubjectsAction, "00195a8d56f1438da5ca72ef4146039081beb1ca52", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addSubjectAction, "40b01aabb52840d1b31436c59737385563dfd7254e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateSubjectAction, "4053901c7932ff0a506ceec0b85b281ffc75d7ca4c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSubjectAction, "402cdba2fb2b3abaf5bf12d8191b77c1cdddf86efc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEnrollmentsAction, "00e409f3fb00fefa105eade17c9be241127faa66f4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addEnrollmentAction, "408919691b757d427e0e98f7f6950029b002775bdb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateEnrollmentAction, "60cebf7ff9bb2c64cfa7a88759eb7b8b36e03fa114", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAttendancesAction, "00d1c201bc8452e9931fc400486a0835ccf8531275", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addAttendanceAction, "40a2fcd804db058a16761e2ec81eeadae5017df6ac", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAttendanceAction, "6019669db80b9e3cea05dddcfdb280432bc1b8f14d", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/dbActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/dbActions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/dbActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00195a8d56f1438da5ca72ef4146039081beb1ca52",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSubjectsAction"],
    "0096451ed85f5ac9d34b7defc21c02708e0162bcd8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUsersAction"],
    "00d1c201bc8452e9931fc400486a0835ccf8531275",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAttendancesAction"],
    "00e409f3fb00fefa105eade17c9be241127faa66f4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEnrollmentsAction"],
    "402cdba2fb2b3abaf5bf12d8191b77c1cdddf86efc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSubjectAction"],
    "4053901c7932ff0a506ceec0b85b281ffc75d7ca4c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateSubjectAction"],
    "408919691b757d427e0e98f7f6950029b002775bdb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addEnrollmentAction"],
    "40a2fcd804db058a16761e2ec81eeadae5017df6ac",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addAttendanceAction"],
    "40b01aabb52840d1b31436c59737385563dfd7254e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addSubjectAction"],
    "40f61a276cdfed2a3dff07b79341cf166e3cf2e5a9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addUserAction"],
    "6019669db80b9e3cea05dddcfdb280432bc1b8f14d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateAttendanceAction"],
    "60cebf7ff9bb2c64cfa7a88759eb7b8b36e03fa114",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateEnrollmentAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions/dbActions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/dbActions.ts [app-rsc] (ecmascript)");
}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/page.tsx <module evaluation>", "default");
}),
"[project]/src/app/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/page.tsx", "default");
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__24b4468e._.js.map