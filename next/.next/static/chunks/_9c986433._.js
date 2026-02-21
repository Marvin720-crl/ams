(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/actions/data:c35948 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"406bc42788adea257d3fd5a2fdcb5904fd924448dc":"getUserByIdAction"},"src/app/actions/dbActions.ts",""] */ __turbopack_context__.s([
    "getUserByIdAction",
    ()=>getUserByIdAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getUserByIdAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("406bc42788adea257d3fd5a2fdcb5904fd924448dc", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getUserByIdAction"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZGJBY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuJ3VzZSBzZXJ2ZXInO1xuXG5pbXBvcnQgeyByZWFkRGIsIHdyaXRlRGIsIHNhdmVQcm9maWxlSW1hZ2UgfSBmcm9tICdAL2xpYi9kYic7XG5pbXBvcnQgeyBVc2VyLCBTdWJqZWN0LCBFbnJvbGxtZW50LCBBdHRlbmRhbmNlLCBMYWIsIFBjLCBMYWJSZXF1ZXN0LCBBdWRpdExvZywgQm9vaywgTGlicmFyeUJvcnJvd2luZywgUm9vbSB9IGZyb20gJ0AvdXRpbHMvc3RvcmFnZSc7XG5cbi8vIFVTRVJTXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlcnNBY3Rpb24oKTogUHJvbWlzZTxVc2VyW10+IHtcbiAgcmV0dXJuIGF3YWl0IHJlYWREYigndXNlcnMnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCeUlkQWN0aW9uKGlkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXIgfCBudWxsPiB7XG4gIGNvbnN0IHVzZXJzID0gYXdhaXQgZ2V0VXNlcnNBY3Rpb24oKTtcbiAgcmV0dXJuIHVzZXJzLmZpbmQodSA9PiB1LmlkID09PSBpZCkgfHwgbnVsbDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFVzZXJBY3Rpb24odXNlcjogVXNlcikge1xuICBjb25zdCB1c2VycyA9IGF3YWl0IHJlYWREYigndXNlcnMnKTtcbiAgdXNlcnMucHVzaCh1c2VyKTtcbiAgYXdhaXQgd3JpdGVEYigndXNlcnMnLCB1c2Vycyk7XG4gIHJldHVybiB1c2VyO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlckFjdGlvbihpZDogc3RyaW5nLCB1cGRhdGVzOiBQYXJ0aWFsPFVzZXI+KSB7XG4gIGNvbnN0IHVzZXJzID0gYXdhaXQgZ2V0VXNlcnNBY3Rpb24oKTtcbiAgY29uc3QgaW5kZXggPSB1c2Vycy5maW5kSW5kZXgodSA9PiB1LmlkID09PSBpZCk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBpZiAodXBkYXRlcy5wcm9maWxlUGljICYmIHVwZGF0ZXMucHJvZmlsZVBpYy5zdGFydHNXaXRoKCdkYXRhOicpKSB7XG4gICAgICBjb25zdCBuZXdQYXRoID0gYXdhaXQgc2F2ZVByb2ZpbGVJbWFnZShpZCwgdXBkYXRlcy5wcm9maWxlUGljKTtcbiAgICAgIGlmIChuZXdQYXRoKSB1cGRhdGVzLnByb2ZpbGVQaWMgPSBuZXdQYXRoO1xuICAgIH1cbiAgICBcbiAgICB1c2Vyc1tpbmRleF0gPSB7IC4uLnVzZXJzW2luZGV4XSwgLi4udXBkYXRlcyB9O1xuICAgIGF3YWl0IHdyaXRlRGIoJ3VzZXJzJywgdXNlcnMpO1xuICAgIHJldHVybiB1c2Vyc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVVc2VyQWN0aW9uKGlkOiBzdHJpbmcpIHtcbiAgICBsZXQgdXNlcnMgPSBhd2FpdCBnZXRVc2Vyc0FjdGlvbigpO1xuICAgIHVzZXJzID0gdXNlcnMuZmlsdGVyKHUgPT4gdS5pZCAhPT0gaWQpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ3VzZXJzJywgdXNlcnMpO1xufVxuXG4vLyBTVUJKRUNUU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN1YmplY3RzQWN0aW9uKCk6IFByb21pc2U8U3ViamVjdFtdPiB7XG4gIHJldHVybiBhd2FpdCByZWFkRGIoJ3N1YmplY3RzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTdWJqZWN0QWN0aW9uKHN1YmplY3Q6IFN1YmplY3QpIHtcbiAgY29uc3Qgc3ViamVjdHMgPSBhd2FpdCByZWFkRGIoJ3N1YmplY3RzJyk7XG4gIHN1YmplY3RzLnB1c2goc3ViamVjdCk7XG4gIGF3YWl0IHdyaXRlRGIoJ3N1YmplY3RzJywgc3ViamVjdHMpO1xuICByZXR1cm4gc3ViamVjdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVN1YmplY3RBY3Rpb24oc3ViamVjdDogU3ViamVjdCkge1xuICAgIGNvbnN0IHN1YmplY3RzID0gYXdhaXQgZ2V0U3ViamVjdHNBY3Rpb24oKTtcbiAgICBjb25zdCBpbmRleCA9IHN1YmplY3RzLmZpbmRJbmRleChzID0+IHMuaWQgPT09IHN1YmplY3QuaWQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgc3ViamVjdHNbaW5kZXhdID0gc3ViamVjdDtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignc3ViamVjdHMnLCBzdWJqZWN0cyk7XG4gICAgICAgIHJldHVybiBzdWJqZWN0c1tpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlU3ViamVjdEFjdGlvbihzdWJqZWN0SWQ6IHN0cmluZykge1xuICAgIGxldCBzdWJqZWN0cyA9IGF3YWl0IGdldFN1YmplY3RzQWN0aW9uKCk7XG4gICAgc3ViamVjdHMgPSBzdWJqZWN0cy5maWx0ZXIocyA9PiBzLmlkICE9PSBzdWJqZWN0SWQpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ3N1YmplY3RzJywgc3ViamVjdHMpO1xufVxuXG5cbi8vIEVOUk9MTE1FTlRTXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RW5yb2xsbWVudHNBY3Rpb24oKTogUHJvbWlzZTxFbnJvbGxtZW50W10+IHtcbiAgcmV0dXJuIGF3YWl0IHJlYWREYignZW5yb2xsbWVudHMnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZEVucm9sbG1lbnRBY3Rpb24oZW5yb2xsbWVudDogRW5yb2xsbWVudCkge1xuICBjb25zdCBlbnJvbGxtZW50cyA9IGF3YWl0IHJlYWREYignZW5yb2xsbWVudHMnKTtcbiAgZW5yb2xsbWVudHMucHVzaChlbnJvbGxtZW50KTtcbiAgYXdhaXQgd3JpdGVEYignZW5yb2xsbWVudHMnLCBlbnJvbGxtZW50cyk7XG4gIHJldHVybiBlbnJvbGxtZW50O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlRW5yb2xsbWVudEFjdGlvbihpZDogc3RyaW5nLCB1cGRhdGVzOiBQYXJ0aWFsPEVucm9sbG1lbnQ+KSB7XG4gIGNvbnN0IGVucm9sbG1lbnRzID0gYXdhaXQgZ2V0RW5yb2xsbWVudHNBY3Rpb24oKTtcbiAgY29uc3QgaW5kZXggPSBlbnJvbGxtZW50cy5maW5kSW5kZXgoZSA9PiBlLmlkID09PSBpZCk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBlbnJvbGxtZW50c1tpbmRleF0gPSB7IC4uLmVucm9sbG1lbnRzW2luZGV4XSwgLi4udXBkYXRlcyB9O1xuICAgIGF3YWl0IHdyaXRlRGIoJ2Vucm9sbG1lbnRzJywgZW5yb2xsbWVudHMpO1xuICAgIHJldHVybiBlbnJvbGxtZW50c1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIEFUVEVOREFOQ0VcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBdHRlbmRhbmNlc0FjdGlvbigpOiBQcm9taXNlPEF0dGVuZGFuY2VbXT4ge1xuICByZXR1cm4gYXdhaXQgcmVhZERiKCdhdHRlbmRhbmNlJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRBdHRlbmRhbmNlQWN0aW9uKGF0dGVuZGFuY2U6IEF0dGVuZGFuY2UpIHtcbiAgY29uc3QgYXR0ZW5kYW5jZXMgPSBhd2FpdCByZWFkRGIoJ2F0dGVuZGFuY2UnKTtcbiAgYXR0ZW5kYW5jZXMucHVzaChhdHRlbmRhbmNlKTtcbiAgYXdhaXQgd3JpdGVEYignYXR0ZW5kYW5jZScsIGF0dGVuZGFuY2VzKTtcbiAgcmV0dXJuIGF0dGVuZGFuY2U7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVBdHRlbmRhbmNlQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8QXR0ZW5kYW5jZT4pIHtcbiAgY29uc3QgYXR0ZW5kYW5jZXMgPSBhd2FpdCBnZXRBdHRlbmRhbmNlc0FjdGlvbigpO1xuICBjb25zdCBpbmRleCA9IGF0dGVuZGFuY2VzLmZpbmRJbmRleChhID0+IGEuaWQgPT09IGlkKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIGF0dGVuZGFuY2VzW2luZGV4XSA9IHsgLi4uYXR0ZW5kYW5jZXNbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgYXdhaXQgd3JpdGVEYignYXR0ZW5kYW5jZScsIGF0dGVuZGFuY2VzKTtcbiAgICByZXR1cm4gYXR0ZW5kYW5jZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBST09NU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFJvb21zQWN0aW9uKCk6IFByb21pc2U8Um9vbVtdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHJlYWREYigncm9vbXMnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFJvb21BY3Rpb24ocm9vbTogUm9vbSkge1xuICAgIGNvbnN0IHJvb21zID0gYXdhaXQgZ2V0Um9vbXNBY3Rpb24oKTtcbiAgICByb29tcy5wdXNoKHJvb20pO1xuICAgIGF3YWl0IHdyaXRlRGIoJ3Jvb21zJywgcm9vbXMpO1xuICAgIHJldHVybiByb29tO1xufVxuXG4vLyBMQUJTXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGFic0FjdGlvbigpOiBQcm9taXNlPExhYltdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHJlYWREYignbGFicycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkTGFiQWN0aW9uKGxhYjogTGFiKSB7XG4gICAgY29uc3QgbGFicyA9IGF3YWl0IGdldExhYnNBY3Rpb24oKTtcbiAgICBsYWJzLnB1c2gobGFiKTtcbiAgICBhd2FpdCB3cml0ZURiKCdsYWJzJywgbGFicyk7XG4gICAgXG4gICAgLy8gQXV0b21hdGljYWxseSBhZGQgUENzIGJhc2VkIG9uIGNhcGFjaXR5XG4gICAgY29uc3QgcGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGFiLmNhcGFjaXR5OyBpKyspIHtcbiAgICAgICAgcGNzLnB1c2goe1xuICAgICAgICAgICAgaWQ6IGBQQy0ke2xhYi5pZH0tJHtpfWAsXG4gICAgICAgICAgICBwY051bWJlcjogaS50b1N0cmluZygpLFxuICAgICAgICAgICAgbGFiSWQ6IGxhYi5pZCxcbiAgICAgICAgICAgIHN0YXR1czogJ2F2YWlsYWJsZScsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhd2FpdCB3cml0ZURiKCdwY3MnLCBwY3MpO1xuXG4gICAgcmV0dXJuIGxhYjtcbn1cblxuLy8gUENzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UGNzQWN0aW9uKCk6IFByb21pc2U8UGNbXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ3BjcycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkUGNBY3Rpb24ocGM6IFBjKSB7XG4gICAgY29uc3QgcGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG4gICAgcGNzLnB1c2gocGMpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIHBjcyk7XG4gICAgcmV0dXJuIHBjO1xufVxuXG4vLyBMQUIgUkVRVUVTVFNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpOiBQcm9taXNlPExhYlJlcXVlc3RbXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ2xhYnJlcXVlc3RzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVMYWJSZXF1ZXN0QWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8TGFiUmVxdWVzdD4pIHtcbiAgY29uc3QgcmVxdWVzdHMgPSBhd2FpdCBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpO1xuICBjb25zdCBpbmRleCA9IHJlcXVlc3RzLmZpbmRJbmRleChyID0+IHIuaWQgPT09IGlkKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHJlcXVlc3RzW2luZGV4XSA9IHsgLi4ucmVxdWVzdHNbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgYXdhaXQgd3JpdGVEYignbGFicmVxdWVzdHMnLCByZXF1ZXN0cyk7XG4gICAgcmV0dXJuIHJlcXVlc3RzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gQVVESVQgTE9HXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXVkaXRMb2dzQWN0aW9uKCk6IFByb21pc2U8QXVkaXRMb2dbXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ2F1ZGl0bG9nJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRBdWRpdExvZ0FjdGlvbihsb2c6IE9taXQ8QXVkaXRMb2csICdpZCcgfCAndGltZXN0YW1wJz4pIHtcbiAgICBjb25zdCBsb2dzID0gYXdhaXQgZ2V0QXVkaXRMb2dzQWN0aW9uKCk7XG4gICAgY29uc3QgbmV3TG9nID0geyBcbiAgICAgICAgLi4ubG9nLCBcbiAgICAgICAgaWQ6IGBMT0ctJHtEYXRlLm5vdygpfWAsIFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSBcbiAgICB9O1xuICAgIGxvZ3MucHVzaChuZXdMb2cpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ2F1ZGl0bG9nJywgbG9ncyk7XG4gICAgcmV0dXJuIG5ld0xvZztcbn1cblxuLy8gU0VUVElOR1NcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5nc0FjdGlvbigpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ3NldHRpbmdzJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpZiBzZXR0aW5ncyBkbyBub3QgZXhpc3QsIGNyZWF0ZSBpdFxuICAgICAgICBjb25zdCBkZWZhdWx0U2V0dGluZ3MgPSB7IHRlYWNoZXJTZWNyZXQ6IFwiY2hhbmdlbWVcIiB9O1xuICAgICAgICBhd2FpdCB3cml0ZURiKCdzZXR0aW5ncycsIGRlZmF1bHRTZXR0aW5ncyk7XG4gICAgICAgIHJldHVybiBkZWZhdWx0U2V0dGluZ3M7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2V0dGluZ3NBY3Rpb24odXBkYXRlczogYW55KSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBnZXRTZXR0aW5nc0FjdGlvbigpO1xuICAgIGNvbnN0IHVwZGF0ZWRTZXR0aW5ncyA9IHsgLi4uc2V0dGluZ3MsIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCdzZXR0aW5ncycsIHVwZGF0ZWRTZXR0aW5ncyk7XG4gICAgcmV0dXJuIHVwZGF0ZWRTZXR0aW5ncztcbn1cblxuLy8gQk9PS1NcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRCb29rc0FjdGlvbigpOiBQcm9taXNlPEJvb2tbXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ2Jvb2tzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRCb29rQWN0aW9uKGJvb2s6IEJvb2spIHtcbiAgICBjb25zdCBib29rcyA9IGF3YWl0IGdldEJvb2tzQWN0aW9uKCk7XG4gICAgYm9va3MucHVzaChib29rKTtcbiAgICBhd2FpdCB3cml0ZURiKCdib29rcycsIGJvb2tzKTtcbiAgICByZXR1cm4gYm9vaztcbn1cblxuLy8gTElCUkFSWSBCT1JST1dJTkdTXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlicmFyeUJvcnJvd2luZ3NBY3Rpb24oKTogUHJvbWlzZTxMaWJyYXJ5Qm9ycm93aW5nW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdsaWJyYXJ5Ym9ycm93aW5ncycpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJ1U0FXc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$c35948__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:c35948 [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = (param)=>{
    let { children } = param;
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const checkUser = {
                "AuthProvider.useEffect.checkUser": async ()=>{
                    const currentUserId = localStorage.getItem('currentUserId');
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
                            const currentUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$c35948__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getUserByIdAction"])(currentUserId);
                            if (currentUser) {
                                setUser(currentUser);
                            }
                        }
                    }
                    setLoading(false);
                }
            }["AuthProvider.useEffect.checkUser"];
            checkUser();
            // Listen for changes in localStorage from other tabs
            window.addEventListener('storage', checkUser);
            return ({
                "AuthProvider.useEffect": ()=>{
                    window.removeEventListener('storage', checkUser);
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], []);
    const login = (user)=>{
        setUser(user);
    };
    const logout = ()=>{
        localStorage.removeItem('currentUserId');
        setUser(null);
    };
    const updateCurrentUser = (updates)=>{
        if (user) {
            const updatedUser = {
                ...user,
                ...updates
            };
            setUser(updatedUser);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center min-h-screen bg-muted/10 p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-pulse flex flex-col items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 bg-primary rounded-2xl mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/contexts/AuthContext.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground font-black uppercase tracking-widest",
                        children: "AMS:AMACC"
                    }, void 0, false, {
                        fileName: "[project]/src/contexts/AuthContext.tsx",
                        lineNumber: 72,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/contexts/AuthContext.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/contexts/AuthContext.tsx",
            lineNumber: 69,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            login,
            logout,
            updateCurrentUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "NiO5z6JIqzX62LS5UWDgIqbZYyY=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file must be bundled in the app's client layer, it shouldn't be directly
// imported by the server.
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    callServer: null,
    createServerReference: null,
    findSourceMapURL: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    callServer: function() {
        return _appcallserver.callServer;
    },
    createServerReference: function() {
        return _client.createServerReference;
    },
    findSourceMapURL: function() {
        return _appfindsourcemapurl.findSourceMapURL;
    }
});
const _appcallserver = __turbopack_context__.r("[project]/node_modules/next/dist/client/app-call-server.js [app-client] (ecmascript)");
const _appfindsourcemapurl = __turbopack_context__.r("[project]/node_modules/next/dist/client/app-find-source-map-url.js [app-client] (ecmascript)");
const _client = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react-server-dom-turbopack/client.js [app-client] (ecmascript)"); //# sourceMappingURL=action-client-wrapper.js.map
}),
]);

//# sourceMappingURL=_9c986433._.js.map