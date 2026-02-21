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
            'attendance.json',
            'labs.json',
            'pcs.json',
            'labrequests.json',
            'auditlog.json',
            'settings.json',
            'books.json',
            'libraryborrowings.json',
            'rooms.json',
            'reservations.json',
            'borrowrequests.json'
        ];
        for (const file of files){
            const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DB_PATH, file);
            try {
                await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].access(filePath);
            } catch  {
                // Create empty array/object if file doesn't exist
                const initialContent = file === 'settings.json' ? '{}' : '[]';
                await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, initialContent);
            }
        }
    } catch (error) {
        console.error('Error ensuring DB structure:', error);
    }
}
async function readDb(file) {
    await ensureDbStructure();
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DB_PATH, `${file}.json`);
    try {
        const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        if (file === 'settings') return {};
        return [];
    }
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

/* __next_internal_action_entry_do_not_use__ [{"00195a8d56f1438da5ca72ef4146039081beb1ca52":"getSubjectsAction","001969d45fed01aa4cb5d778fb08fcfaf0becd41d8":"getAuditLogsAction","001ba8599dbe3a4297c5519a6d4845e589c1e46caa":"getPcsAction","00232967ca798a5757a07845c638d8e2af30ba68a5":"getSettingsAction","0034b9dbe8d1912c6539b5c249739e32678f9b0d29":"getLabRequestsAction","004221dd2f38fdaabc6a51991d7112aec6620f5950":"getLibraryBorrowingsAction","0068238fd0a454bf3d8537926e84b5307d1190a30f":"getBorrowRequestsAction","006d9dd5565ccd47358dc40fb116de02872a8553aa":"getLabsAction","0093022404be7a2c8cf3c4e31349a565c01b062b3c":"cleanupExpiredSessionsAction","0096451ed85f5ac9d34b7defc21c02708e0162bcd8":"getUsersAction","00d1c201bc8452e9931fc400486a0835ccf8531275":"getAttendancesAction","00e0c4dd5a8c37e4625619ce112515b464009c0918":"getBooksAction","00e409f3fb00fefa105eade17c9be241127faa66f4":"getEnrollmentsAction","00e699d72b062c5de96778450dc5e9759d3ad3d21f":"getReservationsAction","00f4762e6567f7a9f098951a867b9624a95b0c2d80":"getRoomsAction","40083d3bc3759646d67641b17a6c27e2e031a2d885":"addRoomAction","40115dfcb0f46d5c00b550063e86657c9362db7bb5":"addBorrowRequestAction","401e52216e62b449efa21e40a52c981ab1d27bba9c":"deleteRoomAction","402cdba2fb2b3abaf5bf12d8191b77c1cdddf86efc":"deleteSubjectAction","4046489c388f0b02acd441eb6b0a3d80beb7291f37":"addAuditLogAction","4053901c7932ff0a506ceec0b85b281ffc75d7ca4c":"updateSubjectAction","406bc42788adea257d3fd5a2fdcb5904fd924448dc":"getUserByIdAction","4076e210dfb3a8ce2c2db19902266778c520ca909d":"addBookAction","408919691b757d427e0e98f7f6950029b002775bdb":"addEnrollmentAction","4092e52943c25ec77739e62fd314ca13c021ae851f":"addReservationAction","40944f351bd75dc0b3af980daf1f1c43a809ea5112":"addLabRequestAction","4097726e1d31c25350c97f2e6250972b1601864ad7":"deleteReservationAction","409c37b18139701890056c4900216f6def7973c84d":"addPcAction","40a2f243b05abe2754d48f16e2ce2f93c2f5b84e8f":"addLabAction","40a2fcd804db058a16761e2ec81eeadae5017df6ac":"addAttendanceAction","40ac4dc2af8399ed0566d2bb32423ccf025474c580":"addLibraryBorrowingAction","40b01aabb52840d1b31436c59737385563dfd7254e":"addSubjectAction","40b9a33bd2e9beaa2be19d71ae5662dc31a7cc4778":"deleteBookAction","40c17e7d7dad94ac9f4c22b23ca50c63706a880802":"deleteLabAction","40ebc3a3568cee87ad5a0f2263791fb4fc9e2f222a":"deleteUserAction","40efc60c962ab0e7363ac29d65ba41a05769f22cf8":"updateSettingsAction","40f61a276cdfed2a3dff07b79341cf166e3cf2e5a9":"addUserAction","60138d8dd94732e282313f4d1c7f108127555bc4ba":"updateLabRequestAction","6019669db80b9e3cea05dddcfdb280432bc1b8f14d":"updateAttendanceAction","60308c7b89e36b1b40892ebd303706de35a52f79cf":"updatePcAction","60336c3f82c7feb52c71efc02b8586e23bd9a31e71":"updateBookAction","604857b440d4d114fcebb590cfec9bd769d3b0efdf":"updateLibraryBorrowingAction","607d6c7ef6411e2f9b6b4c5f8e9f5d7ac25ef37c81":"updateUserAction","60911bbaa29c3f9a1ac61c9e4156e6d4b0ffa52041":"updateBorrowRequestAction","60b22840d6379a9e72673b31a0234ca3643d87d4e0":"updateRoomAction","60cebf7ff9bb2c64cfa7a88759eb7b8b36e03fa114":"updateEnrollmentAction","60da3e532a4f58fb0f6b0ec0428f926853c871c7c0":"updateLabAction"},"",""] */ __turbopack_context__.s([
    "addAttendanceAction",
    ()=>addAttendanceAction,
    "addAuditLogAction",
    ()=>addAuditLogAction,
    "addBookAction",
    ()=>addBookAction,
    "addBorrowRequestAction",
    ()=>addBorrowRequestAction,
    "addEnrollmentAction",
    ()=>addEnrollmentAction,
    "addLabAction",
    ()=>addLabAction,
    "addLabRequestAction",
    ()=>addLabRequestAction,
    "addLibraryBorrowingAction",
    ()=>addLibraryBorrowingAction,
    "addPcAction",
    ()=>addPcAction,
    "addReservationAction",
    ()=>addReservationAction,
    "addRoomAction",
    ()=>addRoomAction,
    "addSubjectAction",
    ()=>addSubjectAction,
    "addUserAction",
    ()=>addUserAction,
    "cleanupExpiredSessionsAction",
    ()=>cleanupExpiredSessionsAction,
    "deleteBookAction",
    ()=>deleteBookAction,
    "deleteLabAction",
    ()=>deleteLabAction,
    "deleteReservationAction",
    ()=>deleteReservationAction,
    "deleteRoomAction",
    ()=>deleteRoomAction,
    "deleteSubjectAction",
    ()=>deleteSubjectAction,
    "deleteUserAction",
    ()=>deleteUserAction,
    "getAttendancesAction",
    ()=>getAttendancesAction,
    "getAuditLogsAction",
    ()=>getAuditLogsAction,
    "getBooksAction",
    ()=>getBooksAction,
    "getBorrowRequestsAction",
    ()=>getBorrowRequestsAction,
    "getEnrollmentsAction",
    ()=>getEnrollmentsAction,
    "getLabRequestsAction",
    ()=>getLabRequestsAction,
    "getLabsAction",
    ()=>getLabsAction,
    "getLibraryBorrowingsAction",
    ()=>getLibraryBorrowingsAction,
    "getPcsAction",
    ()=>getPcsAction,
    "getReservationsAction",
    ()=>getReservationsAction,
    "getRoomsAction",
    ()=>getRoomsAction,
    "getSettingsAction",
    ()=>getSettingsAction,
    "getSubjectsAction",
    ()=>getSubjectsAction,
    "getUserByIdAction",
    ()=>getUserByIdAction,
    "getUsersAction",
    ()=>getUsersAction,
    "updateAttendanceAction",
    ()=>updateAttendanceAction,
    "updateBookAction",
    ()=>updateBookAction,
    "updateBorrowRequestAction",
    ()=>updateBorrowRequestAction,
    "updateEnrollmentAction",
    ()=>updateEnrollmentAction,
    "updateLabAction",
    ()=>updateLabAction,
    "updateLabRequestAction",
    ()=>updateLabRequestAction,
    "updateLibraryBorrowingAction",
    ()=>updateLibraryBorrowingAction,
    "updatePcAction",
    ()=>updatePcAction,
    "updateRoomAction",
    ()=>updateRoomAction,
    "updateSettingsAction",
    ()=>updateSettingsAction,
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
async function cleanupExpiredSessionsAction() {
    const allPcs = await getPcsAction();
    const occupiedPcs = allPcs.filter((pc)=>pc.status === 'occupied');
    if (occupiedPcs.length === 0) return {
        updated: 0
    };
    const allAttendances = await getAttendancesAction();
    const allRequests = await getLabRequestsAction();
    const now = new Date();
    let updatedCount = 0;
    for (const pc of occupiedPcs){
        const activeSession = allAttendances.find((a)=>a.pcId === pc.id && !a.timeOut);
        // Check for sessions from Lab Requests that have expired
        if (activeSession && activeSession.sessionId?.startsWith('SESS-REQ-')) {
            const requestId = activeSession.sessionId.replace('SESS-REQ-', '');
            const request = allRequests.find((r)=>r.id === requestId);
            if (request) {
                try {
                    const endTime = new Date(request.endTime);
                    if (now > endTime) {
                        await updatePcAction(pc.id, {
                            status: 'available'
                        });
                        // Also update the attendance record to mark it as timed-out
                        await updateAttendanceAction(activeSession.id, {
                            timeOut: endTime.toLocaleTimeString('en-US', {
                                hour12: false
                            })
                        });
                        updatedCount++;
                    }
                } catch (e) {
                    console.error("Error processing expired session for request:", request.id, e);
                }
            }
        }
    }
    return {
        updated: updatedCount
    };
}
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
    await addAuditLogAction({
        userId: 'admin',
        userName: 'System',
        action: 'User Created',
        details: `User ${user.name} (${user.id}) was created.`
    });
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
        await addAuditLogAction({
            userId: id,
            userName: users[index].name,
            action: 'Profile Updated',
            details: `User profile for ${users[index].name} was updated.`
        });
        return users[index];
    }
    return null;
}
async function deleteUserAction(id) {
    let users = await getUsersAction();
    const userToDelete = users.find((u)=>u.id === id);
    if (userToDelete) {
        users = users.filter((u)=>u.id !== id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('users', users);
        await addAuditLogAction({
            userId: 'admin',
            userName: 'System',
            action: 'User Deleted',
            details: `User ${userToDelete.name} (${id}) was deleted.`
        });
    }
}
async function getSubjectsAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('subjects');
}
async function addSubjectAction(subject) {
    const subjects = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('subjects');
    subjects.push(subject);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('subjects', subjects);
    await addAuditLogAction({
        userId: subject.teacherId,
        userName: subject.teacherName,
        action: 'Subject Added',
        details: `Subject "${subject.name}" was added.`
    });
    return subject;
}
async function updateSubjectAction(subject) {
    const subjects = await getSubjectsAction();
    const index = subjects.findIndex((s)=>s.id === subject.id);
    if (index !== -1) {
        subjects[index] = subject;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('subjects', subjects);
        await addAuditLogAction({
            userId: subject.teacherId,
            userName: subject.teacherName,
            action: 'Subject Updated',
            details: `Subject "${subject.name}" was updated.`
        });
        return subjects[index];
    }
    return null;
}
async function deleteSubjectAction(subjectId) {
    let subjects = await getSubjectsAction();
    const subjectToDelete = subjects.find((s)=>s.id === subjectId);
    if (subjectToDelete) {
        subjects = subjects.filter((s)=>s.id !== subjectId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('subjects', subjects);
        await addAuditLogAction({
            userId: subjectToDelete.teacherId,
            userName: subjectToDelete.teacherName,
            action: 'Subject Deleted',
            details: `Subject "${subjectToDelete.name}" was deleted.`
        });
    }
}
async function getEnrollmentsAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('enrollments');
}
async function addEnrollmentAction(enrollment) {
    const enrollments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('enrollments');
    enrollments.push(enrollment);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('enrollments', enrollments);
    await addAuditLogAction({
        userId: enrollment.studentId,
        userName: 'Student',
        action: 'Enrollment Request',
        details: `Student ${enrollment.studentId} requested to enroll in subject ${enrollment.subjectId}.`
    });
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
        await addAuditLogAction({
            userId: 'teacher',
            userName: 'Teacher',
            action: `Enrollment ${updates.status}`,
            details: `Enrollment ${id} status changed to ${updates.status}.`
        });
        return enrollments[index];
    }
    return null;
}
async function getAttendancesAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('attendance');
}
async function addAttendanceAction(attendance) {
    const attendances = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('attendance');
    const newAttendance = {
        ...attendance,
        id: `ATT-${Date.now()}`
    };
    attendances.push(newAttendance);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('attendance', attendances);
    // If a PC was assigned, update its status
    if (newAttendance.pcId) {
        await updatePcAction(newAttendance.pcId, {
            status: 'occupied'
        });
    }
    // Create a more detailed audit log
    const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('users');
    const student = users.find((u)=>u.id === newAttendance.studentId);
    const subjects = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('subjects');
    const subject = subjects.find((s)=>s.id === newAttendance.subjectId);
    let locationDetails = '';
    if (newAttendance.locationId && newAttendance.locationType) {
        if (newAttendance.locationType === 'lab') {
            const labs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('labs');
            const lab = labs.find((l)=>l.id === newAttendance.locationId);
            locationDetails = ` in ${lab?.name || 'lab'}`;
            if (newAttendance.pcId) {
                const pcNumber = newAttendance.pcId.split('-').pop();
                locationDetails += ` (PC: ${pcNumber})`;
            }
        } else {
            const rooms = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('rooms');
            const room = rooms.find((r)=>r.id === newAttendance.locationId);
            locationDetails = ` in ${room?.name || 'room'}`;
        }
    }
    await addAuditLogAction({
        userId: newAttendance.studentId,
        userName: student?.name || 'Student',
        action: 'Attendance Marked',
        details: `Marked ${newAttendance.status} for subject ${subject?.name || newAttendance.subjectId}${locationDetails}.`
    });
    return newAttendance;
}
async function updateAttendanceAction(id, updates) {
    const attendances = await getAttendancesAction();
    const index = attendances.findIndex((a)=>a.id === id);
    if (index !== -1) {
        const originalAttendance = {
            ...attendances[index]
        };
        attendances[index] = {
            ...originalAttendance,
            ...updates
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('attendance', attendances);
        // If timing out and there was a pcId, free up the PC
        if (updates.timeOut && originalAttendance.pcId) {
            await updatePcAction(originalAttendance.pcId, {
                status: 'available'
            });
        }
        await addAuditLogAction({
            userId: attendances[index].studentId,
            userName: 'Student',
            action: 'Attendance Updated',
            details: `Attendance ${id} updated. Timeout: ${updates.timeOut}`
        });
        return attendances[index];
    }
    return null;
}
async function getRoomsAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('rooms');
}
async function addRoomAction(room) {
    const rooms = await getRoomsAction();
    rooms.push(room);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('rooms', rooms);
    return room;
}
async function updateRoomAction(id, updates) {
    const rooms = await getRoomsAction();
    const index = rooms.findIndex((r)=>r.id === id);
    if (index !== -1) {
        rooms[index] = {
            ...rooms[index],
            ...updates
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('rooms', rooms);
        return rooms[index];
    }
    return null;
}
async function deleteRoomAction(id) {
    let rooms = await getRoomsAction();
    rooms = rooms.filter((r)=>r.id !== id);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('rooms', rooms);
}
async function getLabsAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('labs');
}
async function addLabAction(lab) {
    const labs = await getLabsAction();
    labs.push(lab);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('labs', labs);
    // Automatically add PCs based on capacity
    const pcs = await getPcsAction();
    for(let i = 1; i <= lab.capacity; i++){
        pcs.push({
            id: `PC-${lab.id}-${i}`,
            pcNumber: i.toString(),
            labId: lab.id,
            status: 'available'
        });
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('pcs', pcs);
    return lab;
}
async function updateLabAction(id, updates) {
    const labs = await getLabsAction();
    const index = labs.findIndex((l)=>l.id === id);
    if (index !== -1) {
        const oldLab = {
            ...labs[index]
        };
        const newLabData = {
            ...labs[index],
            ...updates
        };
        // If capacity has changed, update PCs
        if (updates.capacity !== undefined && updates.capacity !== oldLab.capacity) {
            const newCapacity = updates.capacity;
            const oldCapacity = oldLab.capacity;
            let allPcs = await getPcsAction();
            if (newCapacity > oldCapacity) {
                // Add new PCs
                for(let i = oldCapacity + 1; i <= newCapacity; i++){
                    allPcs.push({
                        id: `PC-${id}-${i}`,
                        pcNumber: i.toString(),
                        labId: id,
                        status: 'available'
                    });
                }
            } else {
                const pcsForThisLab = allPcs.filter((pc)=>pc.labId === id);
                const pcNumbersToRemove = pcsForThisLab.map((pc)=>parseInt(pc.pcNumber)).sort((a, b)=>b - a) // sort descending
                .slice(0, oldCapacity - newCapacity);
                const pcIdsToRemove = pcsForThisLab.filter((pc)=>pcNumbersToRemove.includes(parseInt(pc.pcNumber))).map((pc)=>pc.id);
                // Filter out the PCs to remove
                allPcs = allPcs.filter((pc)=>!pcIdsToRemove.includes(pc.id));
                // Also remove any pending/approved requests for these PCs
                let allRequests = await getLabRequestsAction();
                allRequests = allRequests.filter((req)=>!pcIdsToRemove.includes(req.pcId));
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('labrequests', allRequests);
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('pcs', allPcs);
        }
        labs[index] = newLabData;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('labs', labs);
        return newLabData;
    }
    return null;
}
async function deleteLabAction(id) {
    let labs = await getLabsAction();
    labs = labs.filter((l)=>l.id !== id);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('labs', labs);
    let pcs = await getPcsAction();
    pcs = pcs.filter((pc)=>pc.labId !== id);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('pcs', pcs);
}
async function getPcsAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('pcs');
}
async function addPcAction(pc) {
    const pcs = await getPcsAction();
    pcs.push(pc);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('pcs', pcs);
    return pc;
}
async function updatePcAction(id, updates) {
    const pcs = await getPcsAction();
    const index = pcs.findIndex((pc)=>pc.id === id);
    if (index !== -1) {
        pcs[index] = {
            ...pcs[index],
            ...updates
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('pcs', pcs);
        return pcs[index];
    }
    return null;
}
async function getLabRequestsAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('labrequests');
}
async function addLabRequestAction(request) {
    const requests = await getLabRequestsAction();
    const newRequest = {
        ...request,
        id: `REQ-${Date.now()}`
    };
    requests.push(newRequest);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('labrequests', requests);
    await addAuditLogAction({
        userId: newRequest.studentId,
        userName: 'Student',
        action: 'Lab Request Created',
        details: `Request for Lab ${newRequest.labId} for subject ${newRequest.subjectId}.`
    });
    return newRequest;
}
async function updateLabRequestAction(id, updates) {
    const requests = await getLabRequestsAction();
    const index = requests.findIndex((r)=>r.id === id);
    if (index !== -1) {
        requests[index] = {
            ...requests[index],
            ...updates
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('labrequests', requests);
        await addAuditLogAction({
            userId: requests[index].teacherId,
            userName: 'Teacher',
            action: `Lab Request ${updates.status}`,
            details: `Request ${id} status changed to ${updates.status}.`
        });
        return requests[index];
    }
    return null;
}
async function getAuditLogsAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('auditlog');
}
async function addAuditLogAction(log) {
    const logs = await getAuditLogsAction();
    const newLog = {
        ...log,
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString()
    };
    logs.unshift(newLog); // Add to the beginning
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('auditlog', logs);
    return newLog;
}
async function getSettingsAction() {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('settings');
    } catch (e) {
        // if settings do not exist, create it
        const defaultSettings = {
            teacherSecret: "changeme"
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('settings', defaultSettings);
        return defaultSettings;
    }
}
async function updateSettingsAction(updates) {
    const settings = await getSettingsAction();
    const updatedSettings = {
        ...settings,
        ...updates
    };
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('settings', updatedSettings);
    return updatedSettings;
}
async function getBooksAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('books');
}
async function addBookAction(book) {
    const books = await getBooksAction();
    const newBook = {
        ...book,
        id: `BOOK-${Date.now()}`
    };
    books.push(newBook);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('books', books);
    return newBook;
}
async function updateBookAction(id, updates) {
    const books = await getBooksAction();
    const index = books.findIndex((b)=>b.id === id);
    if (index !== -1) {
        books[index] = {
            ...books[index],
            ...updates
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('books', books);
        return books[index];
    }
    return null;
}
async function deleteBookAction(id) {
    let books = await getBooksAction();
    books = books.filter((b)=>b.id !== id);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('books', books);
}
async function getLibraryBorrowingsAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('libraryborrowings');
}
async function addLibraryBorrowingAction(borrowing) {
    const borrowings = await getLibraryBorrowingsAction();
    const newBorrowing = {
        ...borrowing,
        id: `LB-${Date.now()}`
    };
    borrowings.push(newBorrowing);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('libraryborrowings', borrowings);
    return newBorrowing;
}
async function updateLibraryBorrowingAction(id, updates) {
    const borrowings = await getLibraryBorrowingsAction();
    const index = borrowings.findIndex((b)=>b.id === id);
    if (index !== -1) {
        borrowings[index] = {
            ...borrowings[index],
            ...updates
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('libraryborrowings', borrowings);
        return borrowings[index];
    }
    return null;
}
async function getBorrowRequestsAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('borrowrequests');
}
async function addBorrowRequestAction(request) {
    const requests = await getBorrowRequestsAction();
    const newRequest = {
        ...request,
        id: `BR-${Date.now()}`
    };
    requests.push(newRequest);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('borrowrequests', requests);
    return newRequest;
}
async function updateBorrowRequestAction(id, updates) {
    const requests = await getBorrowRequestsAction();
    const index = requests.findIndex((r)=>r.id === id);
    if (index !== -1) {
        requests[index] = {
            ...requests[index],
            ...updates
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('borrowrequests', requests);
        return requests[index];
    }
    return null;
}
async function getReservationsAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["readDb"])('reservations');
}
async function addReservationAction(reservation) {
    const reservations = await getReservationsAction();
    const newReservation = {
        ...reservation,
        id: `RES-${Date.now()}`
    };
    reservations.push(newReservation);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('reservations', reservations);
    await addAuditLogAction({
        userId: newReservation.teacherId,
        userName: 'Teacher',
        action: 'Reservation Created',
        details: `Reserved ${newReservation.locationType} ${newReservation.locationId} for subject ${newReservation.subjectId} on ${newReservation.date}.`
    });
    return newReservation;
}
async function deleteReservationAction(id) {
    let reservations = await getReservationsAction();
    const resToDelete = reservations.find((r)=>r.id === id);
    if (resToDelete) {
        reservations = reservations.filter((r)=>r.id !== id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeDb"])('reservations', reservations);
        await addAuditLogAction({
            userId: resToDelete.teacherId,
            userName: 'Teacher',
            action: 'Reservation Deleted',
            details: `Deleted reservation ${id}.`
        });
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    cleanupExpiredSessionsAction,
    getUsersAction,
    getUserByIdAction,
    addUserAction,
    updateUserAction,
    deleteUserAction,
    getSubjectsAction,
    addSubjectAction,
    updateSubjectAction,
    deleteSubjectAction,
    getEnrollmentsAction,
    addEnrollmentAction,
    updateEnrollmentAction,
    getAttendancesAction,
    addAttendanceAction,
    updateAttendanceAction,
    getRoomsAction,
    addRoomAction,
    updateRoomAction,
    deleteRoomAction,
    getLabsAction,
    addLabAction,
    updateLabAction,
    deleteLabAction,
    getPcsAction,
    addPcAction,
    updatePcAction,
    getLabRequestsAction,
    addLabRequestAction,
    updateLabRequestAction,
    getAuditLogsAction,
    addAuditLogAction,
    getSettingsAction,
    updateSettingsAction,
    getBooksAction,
    addBookAction,
    updateBookAction,
    deleteBookAction,
    getLibraryBorrowingsAction,
    addLibraryBorrowingAction,
    updateLibraryBorrowingAction,
    getBorrowRequestsAction,
    addBorrowRequestAction,
    updateBorrowRequestAction,
    getReservationsAction,
    addReservationAction,
    deleteReservationAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(cleanupExpiredSessionsAction, "0093022404be7a2c8cf3c4e31349a565c01b062b3c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUsersAction, "0096451ed85f5ac9d34b7defc21c02708e0162bcd8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserByIdAction, "406bc42788adea257d3fd5a2fdcb5904fd924448dc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addUserAction, "40f61a276cdfed2a3dff07b79341cf166e3cf2e5a9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUserAction, "607d6c7ef6411e2f9b6b4c5f8e9f5d7ac25ef37c81", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteUserAction, "40ebc3a3568cee87ad5a0f2263791fb4fc9e2f222a", null);
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRoomsAction, "00f4762e6567f7a9f098951a867b9624a95b0c2d80", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addRoomAction, "40083d3bc3759646d67641b17a6c27e2e031a2d885", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateRoomAction, "60b22840d6379a9e72673b31a0234ca3643d87d4e0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteRoomAction, "401e52216e62b449efa21e40a52c981ab1d27bba9c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLabsAction, "006d9dd5565ccd47358dc40fb116de02872a8553aa", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addLabAction, "40a2f243b05abe2754d48f16e2ce2f93c2f5b84e8f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateLabAction, "60da3e532a4f58fb0f6b0ec0428f926853c871c7c0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteLabAction, "40c17e7d7dad94ac9f4c22b23ca50c63706a880802", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPcsAction, "001ba8599dbe3a4297c5519a6d4845e589c1e46caa", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addPcAction, "409c37b18139701890056c4900216f6def7973c84d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePcAction, "60308c7b89e36b1b40892ebd303706de35a52f79cf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLabRequestsAction, "0034b9dbe8d1912c6539b5c249739e32678f9b0d29", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addLabRequestAction, "40944f351bd75dc0b3af980daf1f1c43a809ea5112", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateLabRequestAction, "60138d8dd94732e282313f4d1c7f108127555bc4ba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAuditLogsAction, "001969d45fed01aa4cb5d778fb08fcfaf0becd41d8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addAuditLogAction, "4046489c388f0b02acd441eb6b0a3d80beb7291f37", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSettingsAction, "00232967ca798a5757a07845c638d8e2af30ba68a5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateSettingsAction, "40efc60c962ab0e7363ac29d65ba41a05769f22cf8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getBooksAction, "00e0c4dd5a8c37e4625619ce112515b464009c0918", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addBookAction, "4076e210dfb3a8ce2c2db19902266778c520ca909d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateBookAction, "60336c3f82c7feb52c71efc02b8586e23bd9a31e71", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteBookAction, "40b9a33bd2e9beaa2be19d71ae5662dc31a7cc4778", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLibraryBorrowingsAction, "004221dd2f38fdaabc6a51991d7112aec6620f5950", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addLibraryBorrowingAction, "40ac4dc2af8399ed0566d2bb32423ccf025474c580", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateLibraryBorrowingAction, "604857b440d4d114fcebb590cfec9bd769d3b0efdf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getBorrowRequestsAction, "0068238fd0a454bf3d8537926e84b5307d1190a30f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addBorrowRequestAction, "40115dfcb0f46d5c00b550063e86657c9362db7bb5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateBorrowRequestAction, "60911bbaa29c3f9a1ac61c9e4156e6d4b0ffa52041", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getReservationsAction, "00e699d72b062c5de96778450dc5e9759d3ad3d21f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addReservationAction, "4092e52943c25ec77739e62fd314ca13c021ae851f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteReservationAction, "4097726e1d31c25350c97f2e6250972b1601864ad7", null);
}),
"[project]/.next-internal/server/app/profile/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/dbActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/dbActions.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/.next-internal/server/app/profile/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/dbActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "406bc42788adea257d3fd5a2fdcb5904fd924448dc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserByIdAction"],
    "607d6c7ef6411e2f9b6b4c5f8e9f5d7ac25ef37c81",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateUserAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$profile$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/profile/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions/dbActions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$dbActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/dbActions.ts [app-rsc] (ecmascript)");
}),
"[project]/src/app/icon.svg.mjs { IMAGE => \"[project]/src/app/icon.svg (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/icon.svg.mjs { IMAGE => \"[project]/src/app/icon.svg (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/profile/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/profile/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/profile/page.tsx <module evaluation>", "default");
}),
"[project]/src/app/profile/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/profile/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/profile/page.tsx", "default");
}),
"[project]/src/app/profile/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/profile/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/profile/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$profile$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/profile/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/profile/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a4aa4ab9._.js.map