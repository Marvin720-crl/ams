(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/actions/data:365bc7 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"406bc42788adea257d3fd5a2fdcb5904fd924448dc":"getUserByIdAction"},"src/app/actions/dbActions.ts",""] */ __turbopack_context__.s([
    "getUserByIdAction",
    ()=>getUserByIdAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getUserByIdAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("406bc42788adea257d3fd5a2fdcb5904fd924448dc", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getUserByIdAction"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZGJBY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuJ3VzZSBzZXJ2ZXInO1xuXG5pbXBvcnQgeyByZWFkRGIsIHdyaXRlRGIsIHNhdmVQcm9maWxlSW1hZ2UgfSBmcm9tICdAL2xpYi9kYic7XG5pbXBvcnQgeyBVc2VyLCBTdWJqZWN0LCBFbnJvbGxtZW50LCBBdHRlbmRhbmNlLCBMYWIsIFBjLCBMYWJSZXF1ZXN0LCBBdWRpdExvZywgQm9vaywgTGlicmFyeUJvcnJvd2luZywgUm9vbSwgUmVzZXJ2YXRpb24sIEJvcnJvd1JlcXVlc3QgfSBmcm9tICdAL3V0aWxzL3N0b3JhZ2UnO1xuXG4vLyBVU0VSU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJzQWN0aW9uKCk6IFByb21pc2U8VXNlcltdPiB7XG4gIHJldHVybiBhd2FpdCByZWFkRGIoJ3VzZXJzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyQnlJZEFjdGlvbihpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyIHwgbnVsbD4ge1xuICBjb25zdCB1c2VycyA9IGF3YWl0IGdldFVzZXJzQWN0aW9uKCk7XG4gIHJldHVybiB1c2Vycy5maW5kKHUgPT4gdS5pZCA9PT0gaWQpIHx8IG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRVc2VyQWN0aW9uKHVzZXI6IFVzZXIpIHtcbiAgY29uc3QgdXNlcnMgPSBhd2FpdCByZWFkRGIoJ3VzZXJzJyk7XG4gIHVzZXJzLnB1c2godXNlcik7XG4gIGF3YWl0IHdyaXRlRGIoJ3VzZXJzJywgdXNlcnMpO1xuICByZXR1cm4gdXNlcjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVVzZXJBY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxVc2VyPikge1xuICBjb25zdCB1c2VycyA9IGF3YWl0IGdldFVzZXJzQWN0aW9uKCk7XG4gIGNvbnN0IGluZGV4ID0gdXNlcnMuZmluZEluZGV4KHUgPT4gdS5pZCA9PT0gaWQpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgaWYgKHVwZGF0ZXMucHJvZmlsZVBpYyAmJiB1cGRhdGVzLnByb2ZpbGVQaWMuc3RhcnRzV2l0aCgnZGF0YTonKSkge1xuICAgICAgY29uc3QgbmV3UGF0aCA9IGF3YWl0IHNhdmVQcm9maWxlSW1hZ2UoaWQsIHVwZGF0ZXMucHJvZmlsZVBpYyk7XG4gICAgICBpZiAobmV3UGF0aCkgdXBkYXRlcy5wcm9maWxlUGljID0gbmV3UGF0aDtcbiAgICB9XG4gICAgXG4gICAgdXNlcnNbaW5kZXhdID0geyAuLi51c2Vyc1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCd1c2VycycsIHVzZXJzKTtcbiAgICByZXR1cm4gdXNlcnNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlVXNlckFjdGlvbihpZDogc3RyaW5nKSB7XG4gICAgbGV0IHVzZXJzID0gYXdhaXQgZ2V0VXNlcnNBY3Rpb24oKTtcbiAgICB1c2VycyA9IHVzZXJzLmZpbHRlcih1ID0+IHUuaWQgIT09IGlkKTtcbiAgICBhd2FpdCB3cml0ZURiKCd1c2VycycsIHVzZXJzKTtcbn1cblxuLy8gU1VCSkVDVFNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdWJqZWN0c0FjdGlvbigpOiBQcm9taXNlPFN1YmplY3RbXT4ge1xuICByZXR1cm4gYXdhaXQgcmVhZERiKCdzdWJqZWN0cycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU3ViamVjdEFjdGlvbihzdWJqZWN0OiBTdWJqZWN0KSB7XG4gIGNvbnN0IHN1YmplY3RzID0gYXdhaXQgcmVhZERiKCdzdWJqZWN0cycpO1xuICBzdWJqZWN0cy5wdXNoKHN1YmplY3QpO1xuICBhd2FpdCB3cml0ZURiKCdzdWJqZWN0cycsIHN1YmplY3RzKTtcbiAgcmV0dXJuIHN1YmplY3Q7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVTdWJqZWN0QWN0aW9uKHN1YmplY3Q6IFN1YmplY3QpIHtcbiAgICBjb25zdCBzdWJqZWN0cyA9IGF3YWl0IGdldFN1YmplY3RzQWN0aW9uKCk7XG4gICAgY29uc3QgaW5kZXggPSBzdWJqZWN0cy5maW5kSW5kZXgocyA9PiBzLmlkID09PSBzdWJqZWN0LmlkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHN1YmplY3RzW2luZGV4XSA9IHN1YmplY3Q7XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3N1YmplY3RzJywgc3ViamVjdHMpO1xuICAgICAgICByZXR1cm4gc3ViamVjdHNbaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVN1YmplY3RBY3Rpb24oc3ViamVjdElkOiBzdHJpbmcpIHtcbiAgICBsZXQgc3ViamVjdHMgPSBhd2FpdCBnZXRTdWJqZWN0c0FjdGlvbigpO1xuICAgIHN1YmplY3RzID0gc3ViamVjdHMuZmlsdGVyKHMgPT4gcy5pZCAhPT0gc3ViamVjdElkKTtcbiAgICBhd2FpdCB3cml0ZURiKCdzdWJqZWN0cycsIHN1YmplY3RzKTtcbn1cblxuXG4vLyBFTlJPTExNRU5UU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEVucm9sbG1lbnRzQWN0aW9uKCk6IFByb21pc2U8RW5yb2xsbWVudFtdPiB7XG4gIHJldHVybiBhd2FpdCByZWFkRGIoJ2Vucm9sbG1lbnRzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRFbnJvbGxtZW50QWN0aW9uKGVucm9sbG1lbnQ6IEVucm9sbG1lbnQpIHtcbiAgY29uc3QgZW5yb2xsbWVudHMgPSBhd2FpdCByZWFkRGIoJ2Vucm9sbG1lbnRzJyk7XG4gIGVucm9sbG1lbnRzLnB1c2goZW5yb2xsbWVudCk7XG4gIGF3YWl0IHdyaXRlRGIoJ2Vucm9sbG1lbnRzJywgZW5yb2xsbWVudHMpO1xuICByZXR1cm4gZW5yb2xsbWVudDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUVucm9sbG1lbnRBY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxFbnJvbGxtZW50Pikge1xuICBjb25zdCBlbnJvbGxtZW50cyA9IGF3YWl0IGdldEVucm9sbG1lbnRzQWN0aW9uKCk7XG4gIGNvbnN0IGluZGV4ID0gZW5yb2xsbWVudHMuZmluZEluZGV4KGUgPT4gZS5pZCA9PT0gaWQpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZW5yb2xsbWVudHNbaW5kZXhdID0geyAuLi5lbnJvbGxtZW50c1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCdlbnJvbGxtZW50cycsIGVucm9sbG1lbnRzKTtcbiAgICByZXR1cm4gZW5yb2xsbWVudHNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBBVFRFTkRBTkNFXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXR0ZW5kYW5jZXNBY3Rpb24oKTogUHJvbWlzZTxBdHRlbmRhbmNlW10+IHtcbiAgcmV0dXJuIGF3YWl0IHJlYWREYignYXR0ZW5kYW5jZScpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkQXR0ZW5kYW5jZUFjdGlvbihhdHRlbmRhbmNlOiBBdHRlbmRhbmNlKSB7XG4gIGNvbnN0IGF0dGVuZGFuY2VzID0gYXdhaXQgcmVhZERiKCdhdHRlbmRhbmNlJyk7XG4gIGF0dGVuZGFuY2VzLnB1c2goYXR0ZW5kYW5jZSk7XG4gIGF3YWl0IHdyaXRlRGIoJ2F0dGVuZGFuY2UnLCBhdHRlbmRhbmNlcyk7XG4gIHJldHVybiBhdHRlbmRhbmNlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlQXR0ZW5kYW5jZUFjdGlvbihpZDogc3RyaW5nLCB1cGRhdGVzOiBQYXJ0aWFsPEF0dGVuZGFuY2U+KSB7XG4gIGNvbnN0IGF0dGVuZGFuY2VzID0gYXdhaXQgZ2V0QXR0ZW5kYW5jZXNBY3Rpb24oKTtcbiAgY29uc3QgaW5kZXggPSBhdHRlbmRhbmNlcy5maW5kSW5kZXgoYSA9PiBhLmlkID09PSBpZCk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBhdHRlbmRhbmNlc1tpbmRleF0gPSB7IC4uLmF0dGVuZGFuY2VzW2luZGV4XSwgLi4udXBkYXRlcyB9O1xuICAgIGF3YWl0IHdyaXRlRGIoJ2F0dGVuZGFuY2UnLCBhdHRlbmRhbmNlcyk7XG4gICAgcmV0dXJuIGF0dGVuZGFuY2VzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gUk9PTVNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSb29tc0FjdGlvbigpOiBQcm9taXNlPFJvb21bXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ3Jvb21zJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRSb29tQWN0aW9uKHJvb206IFJvb20pIHtcbiAgICBjb25zdCByb29tcyA9IGF3YWl0IGdldFJvb21zQWN0aW9uKCk7XG4gICAgcm9vbXMucHVzaChyb29tKTtcbiAgICBhd2FpdCB3cml0ZURiKCdyb29tcycsIHJvb21zKTtcbiAgICByZXR1cm4gcm9vbTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJvb21BY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxSb29tPikge1xuICAgIGNvbnN0IHJvb21zID0gYXdhaXQgZ2V0Um9vbXNBY3Rpb24oKTtcbiAgICBjb25zdCBpbmRleCA9IHJvb21zLmZpbmRJbmRleChyID0+IHIuaWQgPT09IGlkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHJvb21zW2luZGV4XSA9IHsgLi4ucm9vbXNbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3Jvb21zJywgcm9vbXMpO1xuICAgICAgICByZXR1cm4gcm9vbXNbaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVJvb21BY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCByb29tcyA9IGF3YWl0IGdldFJvb21zQWN0aW9uKCk7XG4gICAgcm9vbXMgPSByb29tcy5maWx0ZXIociA9PiByLmlkICE9PSBpZCk7XG4gICAgYXdhaXQgd3JpdGVEYigncm9vbXMnLCByb29tcyk7XG59XG5cbi8vIExBQlNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMYWJzQWN0aW9uKCk6IFByb21pc2U8TGFiW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdsYWJzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRMYWJBY3Rpb24obGFiOiBMYWIpIHtcbiAgICBjb25zdCBsYWJzID0gYXdhaXQgZ2V0TGFic0FjdGlvbigpO1xuICAgIGxhYnMucHVzaChsYWIpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ2xhYnMnLCBsYWJzKTtcbiAgICBcbiAgICAvLyBBdXRvbWF0aWNhbGx5IGFkZCBQQ3MgYmFzZWQgb24gY2FwYWNpdHlcbiAgICBjb25zdCBwY3MgPSBhd2FpdCBnZXRQY3NBY3Rpb24oKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsYWIuY2FwYWNpdHk7IGkrKykge1xuICAgICAgICBwY3MucHVzaCh7XG4gICAgICAgICAgICBpZDogYFBDLSR7bGFiLmlkfS0ke2l9YCxcbiAgICAgICAgICAgIHBjTnVtYmVyOiBpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBsYWJJZDogbGFiLmlkLFxuICAgICAgICAgICAgc3RhdHVzOiAnYXZhaWxhYmxlJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIHBjcyk7XG5cbiAgICByZXR1cm4gbGFiO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGFiQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8TGFiPikge1xuICAgIGNvbnN0IGxhYnMgPSBhd2FpdCBnZXRMYWJzQWN0aW9uKCk7XG4gICAgY29uc3QgaW5kZXggPSBsYWJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IGlkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IG9sZExhYiA9IHsgLi4ubGFic1tpbmRleF0gfTtcbiAgICAgICAgY29uc3QgbmV3TGFiRGF0YSA9IHsgLi4ubGFic1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcblxuICAgICAgICAvLyBJZiBjYXBhY2l0eSBoYXMgY2hhbmdlZCwgdXBkYXRlIFBDc1xuICAgICAgICBpZiAodXBkYXRlcy5jYXBhY2l0eSAhPT0gdW5kZWZpbmVkICYmIHVwZGF0ZXMuY2FwYWNpdHkgIT09IG9sZExhYi5jYXBhY2l0eSkge1xuICAgICAgICAgICAgY29uc3QgbmV3Q2FwYWNpdHkgPSB1cGRhdGVzLmNhcGFjaXR5O1xuICAgICAgICAgICAgY29uc3Qgb2xkQ2FwYWNpdHkgPSBvbGRMYWIuY2FwYWNpdHk7XG4gICAgICAgICAgICBsZXQgYWxsUGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmIChuZXdDYXBhY2l0eSA+IG9sZENhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIG5ldyBQQ3NcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHkgKyAxOyBpIDw9IG5ld0NhcGFjaXR5OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsUGNzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGBQQy0ke2lkfS0ke2l9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBjTnVtYmVyOiBpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJJZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdhdmFpbGFibGUnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBuZXdDYXBhY2l0eSA8IG9sZENhcGFjaXR5XG4gICAgICAgICAgICAgICAgY29uc3QgcGNzRm9yVGhpc0xhYiA9IGFsbFBjcy5maWx0ZXIocGMgPT4gcGMubGFiSWQgPT09IGlkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwY051bWJlcnNUb1JlbW92ZSA9IHBjc0ZvclRoaXNMYWJcbiAgICAgICAgICAgICAgICAgICAgLm1hcChwYyA9PiBwYXJzZUludChwYy5wY051bWJlcikpXG4gICAgICAgICAgICAgICAgICAgIC5zb3J0KChhLGIpID0+IGItYSkgLy8gc29ydCBkZXNjZW5kaW5nXG4gICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCBvbGRDYXBhY2l0eSAtIG5ld0NhcGFjaXR5KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBwY0lkc1RvUmVtb3ZlID0gcGNzRm9yVGhpc0xhYlxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHBjID0+IHBjTnVtYmVyc1RvUmVtb3ZlLmluY2x1ZGVzKHBhcnNlSW50KHBjLnBjTnVtYmVyKSkpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAocGMgPT4gcGMuaWQpO1xuXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0aGUgUENzIHRvIHJlbW92ZVxuICAgICAgICAgICAgICAgIGFsbFBjcyA9IGFsbFBjcy5maWx0ZXIocGMgPT4gIXBjSWRzVG9SZW1vdmUuaW5jbHVkZXMocGMuaWQpKTtcblxuICAgICAgICAgICAgICAgIC8vIEFsc28gcmVtb3ZlIGFueSBwZW5kaW5nL2FwcHJvdmVkIHJlcXVlc3RzIGZvciB0aGVzZSBQQ3NcbiAgICAgICAgICAgICAgICBsZXQgYWxsUmVxdWVzdHMgPSBhd2FpdCBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpO1xuICAgICAgICAgICAgICAgIGFsbFJlcXVlc3RzID0gYWxsUmVxdWVzdHMuZmlsdGVyKHJlcSA9PiAhcGNJZHNUb1JlbW92ZS5pbmNsdWRlcyhyZXEucGNJZCEpKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB3cml0ZURiKCdsYWJyZXF1ZXN0cycsIGFsbFJlcXVlc3RzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIGFsbFBjcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxhYnNbaW5kZXhdID0gbmV3TGFiRGF0YTtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignbGFicycsIGxhYnMpO1xuICAgICAgICByZXR1cm4gbmV3TGFiRGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVMYWJBY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCBsYWJzID0gYXdhaXQgZ2V0TGFic0FjdGlvbigpO1xuICAgIGxhYnMgPSBsYWJzLmZpbHRlcihsID0+IGwuaWQgIT09IGlkKTtcbiAgICBhd2FpdCB3cml0ZURiKCdsYWJzJywgbGFicyk7XG5cbiAgICBsZXQgcGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG4gICAgcGNzID0gcGNzLmZpbHRlcihwYyA9PiBwYy5sYWJJZCAhPT0gaWQpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIHBjcyk7XG59XG5cbi8vIFBDc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBjc0FjdGlvbigpOiBQcm9taXNlPFBjW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdwY3MnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFBjQWN0aW9uKHBjOiBQYykge1xuICAgIGNvbnN0IHBjcyA9IGF3YWl0IGdldFBjc0FjdGlvbigpO1xuICAgIHBjcy5wdXNoKHBjKTtcbiAgICBhd2FpdCB3cml0ZURiKCdwY3MnLCBwY3MpO1xuICAgIHJldHVybiBwYztcbn1cblxuLy8gTEFCIFJFUVVFU1RTXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGFiUmVxdWVzdHNBY3Rpb24oKTogUHJvbWlzZTxMYWJSZXF1ZXN0W10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdsYWJyZXF1ZXN0cycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkTGFiUmVxdWVzdEFjdGlvbihyZXF1ZXN0OiBPbWl0PExhYlJlcXVlc3QsICdpZCc+KSB7XG4gICAgY29uc3QgcmVxdWVzdHMgPSBhd2FpdCBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpO1xuICAgIGNvbnN0IG5ld1JlcXVlc3QgPSB7IC4uLnJlcXVlc3QsIGlkOiBgUkVRLSR7RGF0ZS5ub3coKX1gIH07XG4gICAgcmVxdWVzdHMucHVzaChuZXdSZXF1ZXN0KTtcbiAgICBhd2FpdCB3cml0ZURiKCdsYWJyZXF1ZXN0cycsIHJlcXVlc3RzKTtcbiAgICByZXR1cm4gbmV3UmVxdWVzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUxhYlJlcXVlc3RBY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxMYWJSZXF1ZXN0Pikge1xuICBjb25zdCByZXF1ZXN0cyA9IGF3YWl0IGdldExhYlJlcXVlc3RzQWN0aW9uKCk7XG4gIGNvbnN0IGluZGV4ID0gcmVxdWVzdHMuZmluZEluZGV4KHIgPT4gci5pZCA9PT0gaWQpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgcmVxdWVzdHNbaW5kZXhdID0geyAuLi5yZXF1ZXN0c1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCdsYWJyZXF1ZXN0cycsIHJlcXVlc3RzKTtcbiAgICByZXR1cm4gcmVxdWVzdHNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBBVURJVCBMT0dcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBdWRpdExvZ3NBY3Rpb24oKTogUHJvbWlzZTxBdWRpdExvZ1tdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHJlYWREYignYXVkaXRsb2cnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZEF1ZGl0TG9nQWN0aW9uKGxvZzogT21pdDxBdWRpdExvZywgJ2lkJyB8ICd0aW1lc3RhbXAnPikge1xuICAgIGNvbnN0IGxvZ3MgPSBhd2FpdCBnZXRBdWRpdExvZ3NBY3Rpb24oKTtcbiAgICBjb25zdCBuZXdMb2cgPSB7IFxuICAgICAgICAuLi5sb2csIFxuICAgICAgICBpZDogYExPRy0ke0RhdGUubm93KCl9YCwgXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpIFxuICAgIH07XG4gICAgbG9ncy5wdXNoKG5ld0xvZyk7XG4gICAgYXdhaXQgd3JpdGVEYignYXVkaXRsb2cnLCBsb2dzKTtcbiAgICByZXR1cm4gbmV3TG9nO1xufVxuXG4vLyBTRVRUSU5HU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNldHRpbmdzQWN0aW9uKCk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHJlYWREYignc2V0dGluZ3MnKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlmIHNldHRpbmdzIGRvIG5vdCBleGlzdCwgY3JlYXRlIGl0XG4gICAgICAgIGNvbnN0IGRlZmF1bHRTZXR0aW5ncyA9IHsgdGVhY2hlclNlY3JldDogXCJjaGFuZ2VtZVwiIH07XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3NldHRpbmdzJywgZGVmYXVsdFNldHRpbmdzKTtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRTZXR0aW5ncztcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVTZXR0aW5nc0FjdGlvbih1cGRhdGVzOiBhbnkpIHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGdldFNldHRpbmdzQWN0aW9uKCk7XG4gICAgY29uc3QgdXBkYXRlZFNldHRpbmdzID0geyAuLi5zZXR0aW5ncywgLi4udXBkYXRlcyB9O1xuICAgIGF3YWl0IHdyaXRlRGIoJ3NldHRpbmdzJywgdXBkYXRlZFNldHRpbmdzKTtcbiAgICByZXR1cm4gdXBkYXRlZFNldHRpbmdzO1xufVxuXG4vLyBCT09LU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEJvb2tzQWN0aW9uKCk6IFByb21pc2U8Qm9va1tdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHJlYWREYignYm9va3MnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZEJvb2tBY3Rpb24oYm9vazogT21pdDxCb29rLCAnaWQnPikge1xuICAgIGNvbnN0IGJvb2tzID0gYXdhaXQgZ2V0Qm9va3NBY3Rpb24oKTtcbiAgICBjb25zdCBuZXdCb29rID0geyAuLi5ib29rLCBpZDogYEJPT0stJHtEYXRlLm5vdygpfWB9O1xuICAgIGJvb2tzLnB1c2gobmV3Qm9vayk7XG4gICAgYXdhaXQgd3JpdGVEYignYm9va3MnLCBib29rcyk7XG4gICAgcmV0dXJuIG5ld0Jvb2s7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVCb29rQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8Qm9vaz4pIHtcbiAgICBjb25zdCBib29rcyA9IGF3YWl0IGdldEJvb2tzQWN0aW9uKCk7XG4gICAgY29uc3QgaW5kZXggPSBib29rcy5maW5kSW5kZXgoYiA9PiBiLmlkID09PSBpZCk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBib29rc1tpbmRleF0gPSB7IC4uLmJvb2tzW2luZGV4XSwgLi4udXBkYXRlcyB9O1xuICAgICAgICBhd2FpdCB3cml0ZURiKCdib29rcycsIGJvb2tzKTtcbiAgICAgICAgcmV0dXJuIGJvb2tzW2luZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVCb29rQWN0aW9uKGlkOiBzdHJpbmcpIHtcbiAgICBsZXQgYm9va3MgPSBhd2FpdCBnZXRCb29rc0FjdGlvbigpO1xuICAgIGJvb2tzID0gYm9va3MuZmlsdGVyKGIgPT4gYi5pZCAhPT0gaWQpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ2Jvb2tzJywgYm9va3MpO1xufVxuXG4vLyBMSUJSQVJZIEJPUlJPV0lOR1NcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMaWJyYXJ5Qm9ycm93aW5nc0FjdGlvbigpOiBQcm9taXNlPExpYnJhcnlCb3Jyb3dpbmdbXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ2xpYnJhcnlib3Jyb3dpbmdzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRMaWJyYXJ5Qm9ycm93aW5nQWN0aW9uKGJvcnJvd2luZzogT21pdDxMaWJyYXJ5Qm9ycm93aW5nLCAnaWQnPikge1xuICAgIGNvbnN0IGJvcnJvd2luZ3MgPSBhd2FpdCBnZXRMaWJyYXJ5Qm9ycm93aW5nc0FjdGlvbigpO1xuICAgIGNvbnN0IG5ld0JvcnJvd2luZyA9IHsgLi4uYm9ycm93aW5nLCBpZDogYExCLSR7RGF0ZS5ub3coKX1gfTtcbiAgICBib3Jyb3dpbmdzLnB1c2gobmV3Qm9ycm93aW5nKTtcbiAgICBhd2FpdCB3cml0ZURiKCdsaWJyYXJ5Ym9ycm93aW5ncycsIGJvcnJvd2luZ3MpO1xuICAgIHJldHVybiBuZXdCb3Jyb3dpbmc7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVMaWJyYXJ5Qm9ycm93aW5nQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8TGlicmFyeUJvcnJvd2luZz4pIHtcbiAgICBjb25zdCBib3Jyb3dpbmdzID0gYXdhaXQgZ2V0TGlicmFyeUJvcnJvd2luZ3NBY3Rpb24oKTtcbiAgICBjb25zdCBpbmRleCA9IGJvcnJvd2luZ3MuZmluZEluZGV4KGIgPT4gYi5pZCA9PT0gaWQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgYm9ycm93aW5nc1tpbmRleF0gPSB7IC4uLmJvcnJvd2luZ3NbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ2xpYnJhcnlib3Jyb3dpbmdzJywgYm9ycm93aW5ncyk7XG4gICAgICAgIHJldHVybiBib3Jyb3dpbmdzW2luZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cblxuLy8gQk9SUk9XIFJFUVVFU1RTXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Qm9ycm93UmVxdWVzdHNBY3Rpb24oKTogUHJvbWlzZTxCb3Jyb3dSZXF1ZXN0W10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdib3Jyb3dyZXF1ZXN0cycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkQm9ycm93UmVxdWVzdEFjdGlvbihyZXF1ZXN0OiBPbWl0PEJvcnJvd1JlcXVlc3QsICdpZCc+KSB7XG4gICAgY29uc3QgcmVxdWVzdHMgPSBhd2FpdCBnZXRCb3Jyb3dSZXF1ZXN0c0FjdGlvbigpO1xuICAgIGNvbnN0IG5ld1JlcXVlc3QgPSB7IC4uLnJlcXVlc3QsIGlkOiBgQlItJHtEYXRlLm5vdygpfWAgfTtcbiAgICByZXF1ZXN0cy5wdXNoKG5ld1JlcXVlc3QpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ2JvcnJvd3JlcXVlc3RzJywgcmVxdWVzdHMpO1xuICAgIHJldHVybiBuZXdSZXF1ZXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlQm9ycm93UmVxdWVzdEFjdGlvbihpZDogc3RyaW5nLCB1cGRhdGVzOiBQYXJ0aWFsPEJvcnJvd1JlcXVlc3Q+KSB7XG4gIGNvbnN0IHJlcXVlc3RzID0gYXdhaXQgZ2V0Qm9ycm93UmVxdWVzdHNBY3Rpb24oKTtcbiAgY29uc3QgaW5kZXggPSByZXF1ZXN0cy5maW5kSW5kZXgociA9PiByLmlkID09PSBpZCk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICByZXF1ZXN0c1tpbmRleF0gPSB7IC4uLnJlcXVlc3RzW2luZGV4XSwgLi4udXBkYXRlcyB9O1xuICAgIGF3YWl0IHdyaXRlRGIoJ2JvcnJvd3JlcXVlc3RzJywgcmVxdWVzdHMpO1xuICAgIHJldHVybiByZXF1ZXN0c1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cblxuLy8gUkVTRVJWQVRJT05TXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmVzZXJ2YXRpb25zQWN0aW9uKCk6IFByb21pc2U8UmVzZXJ2YXRpb25bXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ3Jlc2VydmF0aW9ucycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkUmVzZXJ2YXRpb25BY3Rpb24ocmVzZXJ2YXRpb246IE9taXQ8UmVzZXJ2YXRpb24sICdpZCc+KSB7XG4gICAgY29uc3QgcmVzZXJ2YXRpb25zID0gYXdhaXQgZ2V0UmVzZXJ2YXRpb25zQWN0aW9uKCk7XG4gICAgY29uc3QgbmV3UmVzZXJ2YXRpb24gPSB7IC4uLnJlc2VydmF0aW9uLCBpZDogYFJFUy0ke0RhdGUubm93KCl9YH07XG4gICAgcmVzZXJ2YXRpb25zLnB1c2gobmV3UmVzZXJ2YXRpb24pO1xuICAgIGF3YWl0IHdyaXRlRGIoJ3Jlc2VydmF0aW9ucycsIHJlc2VydmF0aW9ucyk7XG4gICAgcmV0dXJuIG5ld1Jlc2VydmF0aW9uO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUmVzZXJ2YXRpb25BY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCByZXNlcnZhdGlvbnMgPSBhd2FpdCBnZXRSZXNlcnZhdGlvbnNBY3Rpb24oKTtcbiAgICByZXNlcnZhdGlvbnMgPSByZXNlcnZhdGlvbnMuZmlsdGVyKHIgPT4gci5pZCAhPT0gaWQpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ3Jlc2VydmF0aW9ucycsIHJlc2VydmF0aW9ucyk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InVTQVdzQiJ9
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$365bc7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:365bc7 [app-client] (ecmascript) <text/javascript>");
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
                            try {
                                const currentUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$365bc7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getUserByIdAction"])(currentUserId);
                                setUser(currentUser);
                            } catch (e) {
                                console.error("Failed to fetch user, logging out.");
                                localStorage.removeItem('currentUserId');
                                setUser(null);
                            }
                        }
                    }
                    setLoading(false);
                }
            }["AuthProvider.useEffect.checkUser"];
            checkUser();
            const handleStorageChange = {
                "AuthProvider.useEffect.handleStorageChange": (event)=>{
                    if (event.key === 'currentUserId') {
                        setLoading(true);
                        checkUser();
                    }
                }
            }["AuthProvider.useEffect.handleStorageChange"];
            window.addEventListener('storage', handleStorageChange);
            return ({
                "AuthProvider.useEffect": ()=>{
                    window.removeEventListener('storage', handleStorageChange);
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], []);
    const login = (userToLogin)=>{
        localStorage.setItem('currentUserId', userToLogin.id);
        setUser(userToLogin);
    };
    const logout = ()=>{
        localStorage.removeItem('currentUserId');
        setUser(null);
        // Full page reload to reset all state
        window.location.href = '/';
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            login,
            logout,
            updateCurrentUser,
            loading
        },
        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center min-h-screen bg-muted/10 p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-pulse flex flex-col items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 bg-primary rounded-2xl mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/contexts/AuthContext.tsx",
                        lineNumber: 86,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground font-black uppercase tracking-widest",
                        children: "AMS:AMACC"
                    }, void 0, false, {
                        fileName: "[project]/src/contexts/AuthContext.tsx",
                        lineNumber: 87,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/contexts/AuthContext.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/contexts/AuthContext.tsx",
            lineNumber: 84,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 82,
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

//# sourceMappingURL=_f02d6ed7._.js.map