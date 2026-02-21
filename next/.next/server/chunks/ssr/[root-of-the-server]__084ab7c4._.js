module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = "Button";
;
}),
"[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Input.displayName = "Input";
;
}),
"[project]/src/components/ui/label.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const labelVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(labelVariants(), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/label.tsx",
        lineNumber: 18,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
Label.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
;
}),
"[project]/src/components/ui/select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const Select = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const SelectGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"];
const SelectValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Value"];
const SelectTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                    className: "h-4 w-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 29,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 28,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 19,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"].displayName;
const SelectScrollUpButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 47,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectScrollUpButton.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollUpButton"].displayName;
const SelectScrollDownButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 64,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 56,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectScrollDownButton.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollDownButton"].displayName;
const SelectContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, children, position = "popper", ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 86,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 87,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 96,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 75,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 74,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
const SelectLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 106,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectLabel.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"].displayName;
const SelectItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/select.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 127,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 126,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 132,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 118,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"].displayName;
const SelectSeparator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("-mx-1 my-1 h-px bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 141,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectSeparator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"].displayName;
;
}),
"[project]/src/app/actions/data:fc4bdc [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40f61a276cdfed2a3dff07b79341cf166e3cf2e5a9":"addUserAction"},"src/app/actions/dbActions.ts",""] */ __turbopack_context__.s([
    "addUserAction",
    ()=>addUserAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var addUserAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40f61a276cdfed2a3dff07b79341cf166e3cf2e5a9", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "addUserAction"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZGJBY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuJ3VzZSBzZXJ2ZXInO1xuXG5pbXBvcnQgeyByZWFkRGIsIHdyaXRlRGIsIHNhdmVQcm9maWxlSW1hZ2UgfSBmcm9tICdAL2xpYi9kYic7XG5pbXBvcnQgeyBVc2VyLCBTdWJqZWN0LCBFbnJvbGxtZW50LCBBdHRlbmRhbmNlLCBMYWIsIFBjLCBMYWJSZXF1ZXN0LCBBdWRpdExvZywgQm9vaywgTGlicmFyeUJvcnJvd2luZywgUm9vbSwgUmVzZXJ2YXRpb24sIEJvcnJvd1JlcXVlc3QgfSBmcm9tICdAL3V0aWxzL3N0b3JhZ2UnO1xuXG4vLyBVU0VSU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJzQWN0aW9uKCk6IFByb21pc2U8VXNlcltdPiB7XG4gIHJldHVybiBhd2FpdCByZWFkRGIoJ3VzZXJzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyQnlJZEFjdGlvbihpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyIHwgbnVsbD4ge1xuICBjb25zdCB1c2VycyA9IGF3YWl0IGdldFVzZXJzQWN0aW9uKCk7XG4gIHJldHVybiB1c2Vycy5maW5kKHUgPT4gdS5pZCA9PT0gaWQpIHx8IG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRVc2VyQWN0aW9uKHVzZXI6IFVzZXIpIHtcbiAgY29uc3QgdXNlcnMgPSBhd2FpdCByZWFkRGIoJ3VzZXJzJyk7XG4gIHVzZXJzLnB1c2godXNlcik7XG4gIGF3YWl0IHdyaXRlRGIoJ3VzZXJzJywgdXNlcnMpO1xuICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgdXNlcklkOiAnYWRtaW4nLFxuICAgIHVzZXJOYW1lOiAnU3lzdGVtJyxcbiAgICBhY3Rpb246ICdVc2VyIENyZWF0ZWQnLFxuICAgIGRldGFpbHM6IGBVc2VyICR7dXNlci5uYW1lfSAoJHt1c2VyLmlkfSkgd2FzIGNyZWF0ZWQuYFxuICB9KTtcbiAgcmV0dXJuIHVzZXI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVVc2VyQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8VXNlcj4pIHtcbiAgY29uc3QgdXNlcnMgPSBhd2FpdCBnZXRVc2Vyc0FjdGlvbigpO1xuICBjb25zdCBpbmRleCA9IHVzZXJzLmZpbmRJbmRleCh1ID0+IHUuaWQgPT09IGlkKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIGlmICh1cGRhdGVzLnByb2ZpbGVQaWMgJiYgdXBkYXRlcy5wcm9maWxlUGljLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgIGNvbnN0IG5ld1BhdGggPSBhd2FpdCBzYXZlUHJvZmlsZUltYWdlKGlkLCB1cGRhdGVzLnByb2ZpbGVQaWMpO1xuICAgICAgaWYgKG5ld1BhdGgpIHVwZGF0ZXMucHJvZmlsZVBpYyA9IG5ld1BhdGg7XG4gICAgfVxuICAgIFxuICAgIHVzZXJzW2luZGV4XSA9IHsgLi4udXNlcnNbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgYXdhaXQgd3JpdGVEYigndXNlcnMnLCB1c2Vycyk7XG4gICAgYXdhaXQgYWRkQXVkaXRMb2dBY3Rpb24oe1xuICAgICAgdXNlcklkOiBpZCxcbiAgICAgIHVzZXJOYW1lOiB1c2Vyc1tpbmRleF0ubmFtZSxcbiAgICAgIGFjdGlvbjogJ1Byb2ZpbGUgVXBkYXRlZCcsXG4gICAgICBkZXRhaWxzOiBgVXNlciBwcm9maWxlIGZvciAke3VzZXJzW2luZGV4XS5uYW1lfSB3YXMgdXBkYXRlZC5gXG4gICAgfSk7XG4gICAgcmV0dXJuIHVzZXJzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVVzZXJBY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCB1c2VycyA9IGF3YWl0IGdldFVzZXJzQWN0aW9uKCk7XG4gICAgY29uc3QgdXNlclRvRGVsZXRlID0gdXNlcnMuZmluZCh1ID0+IHUuaWQgPT09IGlkKTtcbiAgICBpZih1c2VyVG9EZWxldGUpIHtcbiAgICAgICAgdXNlcnMgPSB1c2Vycy5maWx0ZXIodSA9PiB1LmlkICE9PSBpZCk7XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3VzZXJzJywgdXNlcnMpO1xuICAgICAgICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgICAgICAgICB1c2VySWQ6ICdhZG1pbicsXG4gICAgICAgICAgICB1c2VyTmFtZTogJ1N5c3RlbScsXG4gICAgICAgICAgICBhY3Rpb246ICdVc2VyIERlbGV0ZWQnLFxuICAgICAgICAgICAgZGV0YWlsczogYFVzZXIgJHt1c2VyVG9EZWxldGUubmFtZX0gKCR7aWR9KSB3YXMgZGVsZXRlZC5gXG4gICAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vLyBTVUJKRUNUU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN1YmplY3RzQWN0aW9uKCk6IFByb21pc2U8U3ViamVjdFtdPiB7XG4gIHJldHVybiBhd2FpdCByZWFkRGIoJ3N1YmplY3RzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTdWJqZWN0QWN0aW9uKHN1YmplY3Q6IFN1YmplY3QpIHtcbiAgY29uc3Qgc3ViamVjdHMgPSBhd2FpdCByZWFkRGIoJ3N1YmplY3RzJyk7XG4gIHN1YmplY3RzLnB1c2goc3ViamVjdCk7XG4gIGF3YWl0IHdyaXRlRGIoJ3N1YmplY3RzJywgc3ViamVjdHMpO1xuICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgdXNlcklkOiBzdWJqZWN0LnRlYWNoZXJJZCxcbiAgICB1c2VyTmFtZTogc3ViamVjdC50ZWFjaGVyTmFtZSxcbiAgICBhY3Rpb246ICdTdWJqZWN0IEFkZGVkJyxcbiAgICBkZXRhaWxzOiBgU3ViamVjdCBcIiR7c3ViamVjdC5uYW1lfVwiIHdhcyBhZGRlZC5gXG4gIH0pO1xuICByZXR1cm4gc3ViamVjdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVN1YmplY3RBY3Rpb24oc3ViamVjdDogU3ViamVjdCkge1xuICAgIGNvbnN0IHN1YmplY3RzID0gYXdhaXQgZ2V0U3ViamVjdHNBY3Rpb24oKTtcbiAgICBjb25zdCBpbmRleCA9IHN1YmplY3RzLmZpbmRJbmRleChzID0+IHMuaWQgPT09IHN1YmplY3QuaWQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgc3ViamVjdHNbaW5kZXhdID0gc3ViamVjdDtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignc3ViamVjdHMnLCBzdWJqZWN0cyk7XG4gICAgICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgICAgIHVzZXJJZDogc3ViamVjdC50ZWFjaGVySWQsXG4gICAgICAgICAgICB1c2VyTmFtZTogc3ViamVjdC50ZWFjaGVyTmFtZSxcbiAgICAgICAgICAgIGFjdGlvbjogJ1N1YmplY3QgVXBkYXRlZCcsXG4gICAgICAgICAgICBkZXRhaWxzOiBgU3ViamVjdCBcIiR7c3ViamVjdC5uYW1lfVwiIHdhcyB1cGRhdGVkLmBcbiAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1YmplY3RzW2luZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVTdWJqZWN0QWN0aW9uKHN1YmplY3RJZDogc3RyaW5nKSB7XG4gICAgbGV0IHN1YmplY3RzID0gYXdhaXQgZ2V0U3ViamVjdHNBY3Rpb24oKTtcbiAgICBjb25zdCBzdWJqZWN0VG9EZWxldGUgPSBzdWJqZWN0cy5maW5kKHMgPT4gcy5pZCA9PT0gc3ViamVjdElkKTtcbiAgICBpZiAoc3ViamVjdFRvRGVsZXRlKSB7XG4gICAgICAgIHN1YmplY3RzID0gc3ViamVjdHMuZmlsdGVyKHMgPT4gcy5pZCAhPT0gc3ViamVjdElkKTtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignc3ViamVjdHMnLCBzdWJqZWN0cyk7XG4gICAgICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgICAgIHVzZXJJZDogc3ViamVjdFRvRGVsZXRlLnRlYWNoZXJJZCxcbiAgICAgICAgICAgIHVzZXJOYW1lOiBzdWJqZWN0VG9EZWxldGUudGVhY2hlck5hbWUsXG4gICAgICAgICAgICBhY3Rpb246ICdTdWJqZWN0IERlbGV0ZWQnLFxuICAgICAgICAgICAgZGV0YWlsczogYFN1YmplY3QgXCIke3N1YmplY3RUb0RlbGV0ZS5uYW1lfVwiIHdhcyBkZWxldGVkLmBcbiAgICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gRU5ST0xMTUVOVFNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRFbnJvbGxtZW50c0FjdGlvbigpOiBQcm9taXNlPEVucm9sbG1lbnRbXT4ge1xuICByZXR1cm4gYXdhaXQgcmVhZERiKCdlbnJvbGxtZW50cycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkRW5yb2xsbWVudEFjdGlvbihlbnJvbGxtZW50OiBFbnJvbGxtZW50KSB7XG4gIGNvbnN0IGVucm9sbG1lbnRzID0gYXdhaXQgcmVhZERiKCdlbnJvbGxtZW50cycpO1xuICBlbnJvbGxtZW50cy5wdXNoKGVucm9sbG1lbnQpO1xuICBhd2FpdCB3cml0ZURiKCdlbnJvbGxtZW50cycsIGVucm9sbG1lbnRzKTtcbiAgYXdhaXQgYWRkQXVkaXRMb2dBY3Rpb24oe1xuICAgIHVzZXJJZDogZW5yb2xsbWVudC5zdHVkZW50SWQsXG4gICAgdXNlck5hbWU6ICdTdHVkZW50JywgLy8gTmFtZSBub3QgYXZhaWxhYmxlIGhlcmVcbiAgICBhY3Rpb246ICdFbnJvbGxtZW50IFJlcXVlc3QnLFxuICAgIGRldGFpbHM6IGBTdHVkZW50ICR7ZW5yb2xsbWVudC5zdHVkZW50SWR9IHJlcXVlc3RlZCB0byBlbnJvbGwgaW4gc3ViamVjdCAke2Vucm9sbG1lbnQuc3ViamVjdElkfS5gXG4gIH0pO1xuICByZXR1cm4gZW5yb2xsbWVudDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUVucm9sbG1lbnRBY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxFbnJvbGxtZW50Pikge1xuICBjb25zdCBlbnJvbGxtZW50cyA9IGF3YWl0IGdldEVucm9sbG1lbnRzQWN0aW9uKCk7XG4gIGNvbnN0IGluZGV4ID0gZW5yb2xsbWVudHMuZmluZEluZGV4KGUgPT4gZS5pZCA9PT0gaWQpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZW5yb2xsbWVudHNbaW5kZXhdID0geyAuLi5lbnJvbGxtZW50c1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCdlbnJvbGxtZW50cycsIGVucm9sbG1lbnRzKTtcbiAgICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgICAgIHVzZXJJZDogJ3RlYWNoZXInLCAvLyBBc3N1bWUgYSB0ZWFjaGVyIGlzIGRvaW5nIHRoaXNcbiAgICAgICAgdXNlck5hbWU6ICdUZWFjaGVyJyxcbiAgICAgICAgYWN0aW9uOiBgRW5yb2xsbWVudCAke3VwZGF0ZXMuc3RhdHVzfWAsXG4gICAgICAgIGRldGFpbHM6IGBFbnJvbGxtZW50ICR7aWR9IHN0YXR1cyBjaGFuZ2VkIHRvICR7dXBkYXRlcy5zdGF0dXN9LmBcbiAgICAgIH0pO1xuICAgIHJldHVybiBlbnJvbGxtZW50c1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIEFUVEVOREFOQ0VcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBdHRlbmRhbmNlc0FjdGlvbigpOiBQcm9taXNlPEF0dGVuZGFuY2VbXT4ge1xuICByZXR1cm4gYXdhaXQgcmVhZERiKCdhdHRlbmRhbmNlJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRBdHRlbmRhbmNlQWN0aW9uKGF0dGVuZGFuY2U6IE9taXQ8QXR0ZW5kYW5jZSwgJ2lkJz4pIHtcbiAgICBjb25zdCBhdHRlbmRhbmNlcyA9IGF3YWl0IHJlYWREYignYXR0ZW5kYW5jZScpO1xuICAgIGNvbnN0IG5ld0F0dGVuZGFuY2UgPSB7IC4uLmF0dGVuZGFuY2UsIGlkOiBgQVRULSR7RGF0ZS5ub3coKX1gIH07XG4gICAgYXR0ZW5kYW5jZXMucHVzaChuZXdBdHRlbmRhbmNlKTtcbiAgICBhd2FpdCB3cml0ZURiKCdhdHRlbmRhbmNlJywgYXR0ZW5kYW5jZXMpO1xuXG4gICAgLy8gSWYgYSBQQyB3YXMgYXNzaWduZWQsIHVwZGF0ZSBpdHMgc3RhdHVzXG4gICAgaWYgKG5ld0F0dGVuZGFuY2UucGNJZCkge1xuICAgICAgICBhd2FpdCB1cGRhdGVQY0FjdGlvbihuZXdBdHRlbmRhbmNlLnBjSWQsIHsgc3RhdHVzOiAnb2NjdXBpZWQnIH0pO1xuICAgIH1cbiAgICBcbiAgICAvLyBDcmVhdGUgYSBtb3JlIGRldGFpbGVkIGF1ZGl0IGxvZ1xuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgcmVhZERiKCd1c2VycycpO1xuICAgIGNvbnN0IHN0dWRlbnQgPSB1c2Vycy5maW5kKHUgPT4gdS5pZCA9PT0gbmV3QXR0ZW5kYW5jZS5zdHVkZW50SWQpO1xuICAgIGNvbnN0IHN1YmplY3RzID0gYXdhaXQgcmVhZERiKCdzdWJqZWN0cycpO1xuICAgIGNvbnN0IHN1YmplY3QgPSBzdWJqZWN0cy5maW5kKHMgPT4gcy5pZCA9PT0gbmV3QXR0ZW5kYW5jZS5zdWJqZWN0SWQpO1xuXG4gICAgbGV0IGxvY2F0aW9uRGV0YWlscyA9ICcnO1xuICAgIGlmIChuZXdBdHRlbmRhbmNlLmxvY2F0aW9uSWQgJiYgbmV3QXR0ZW5kYW5jZS5sb2NhdGlvblR5cGUpIHtcbiAgICAgICAgaWYgKG5ld0F0dGVuZGFuY2UubG9jYXRpb25UeXBlID09PSAnbGFiJykge1xuICAgICAgICAgICAgY29uc3QgbGFicyA9IGF3YWl0IHJlYWREYignbGFicycpO1xuICAgICAgICAgICAgY29uc3QgbGFiID0gbGFicy5maW5kKGwgPT4gbC5pZCA9PT0gbmV3QXR0ZW5kYW5jZS5sb2NhdGlvbklkKTtcbiAgICAgICAgICAgIGxvY2F0aW9uRGV0YWlscyA9IGAgaW4gJHtsYWI/Lm5hbWUgfHwgJ2xhYid9YDtcbiAgICAgICAgICAgIGlmIChuZXdBdHRlbmRhbmNlLnBjSWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwY051bWJlciA9IG5ld0F0dGVuZGFuY2UucGNJZC5zcGxpdCgnLScpLnBvcCgpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uRGV0YWlscyArPSBgIChQQzogJHtwY051bWJlcn0pYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gcm9vbVxuICAgICAgICAgICAgY29uc3Qgcm9vbXMgPSBhd2FpdCByZWFkRGIoJ3Jvb21zJyk7XG4gICAgICAgICAgICBjb25zdCByb29tID0gcm9vbXMuZmluZChyID0+IHIuaWQgPT09IG5ld0F0dGVuZGFuY2UubG9jYXRpb25JZCk7XG4gICAgICAgICAgICBsb2NhdGlvbkRldGFpbHMgPSBgIGluICR7cm9vbT8ubmFtZSB8fCAncm9vbSd9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgdXNlcklkOiBuZXdBdHRlbmRhbmNlLnN0dWRlbnRJZCxcbiAgICAgICAgdXNlck5hbWU6IHN0dWRlbnQ/Lm5hbWUgfHwgJ1N0dWRlbnQnLFxuICAgICAgICBhY3Rpb246ICdBdHRlbmRhbmNlIE1hcmtlZCcsXG4gICAgICAgIGRldGFpbHM6IGBNYXJrZWQgJHtuZXdBdHRlbmRhbmNlLnN0YXR1c30gZm9yIHN1YmplY3QgJHtzdWJqZWN0Py5uYW1lIHx8IG5ld0F0dGVuZGFuY2Uuc3ViamVjdElkfSR7bG9jYXRpb25EZXRhaWxzfS5gXG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIG5ld0F0dGVuZGFuY2U7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUF0dGVuZGFuY2VBY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxBdHRlbmRhbmNlPikge1xuICBjb25zdCBhdHRlbmRhbmNlcyA9IGF3YWl0IGdldEF0dGVuZGFuY2VzQWN0aW9uKCk7XG4gIGNvbnN0IGluZGV4ID0gYXR0ZW5kYW5jZXMuZmluZEluZGV4KGEgPT4gYS5pZCA9PT0gaWQpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxBdHRlbmRhbmNlID0geyAuLi5hdHRlbmRhbmNlc1tpbmRleF0gfTtcbiAgICBhdHRlbmRhbmNlc1tpbmRleF0gPSB7IC4uLm9yaWdpbmFsQXR0ZW5kYW5jZSwgLi4udXBkYXRlcyB9O1xuICAgIGF3YWl0IHdyaXRlRGIoJ2F0dGVuZGFuY2UnLCBhdHRlbmRhbmNlcyk7XG5cbiAgICAvLyBJZiB0aW1pbmcgb3V0IGFuZCB0aGVyZSB3YXMgYSBwY0lkLCBmcmVlIHVwIHRoZSBQQ1xuICAgIGlmICh1cGRhdGVzLnRpbWVPdXQgJiYgb3JpZ2luYWxBdHRlbmRhbmNlLnBjSWQpIHtcbiAgICAgICAgYXdhaXQgdXBkYXRlUGNBY3Rpb24ob3JpZ2luYWxBdHRlbmRhbmNlLnBjSWQsIHsgc3RhdHVzOiAnYXZhaWxhYmxlJyB9KTtcbiAgICB9XG5cbiAgICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgICAgIHVzZXJJZDogYXR0ZW5kYW5jZXNbaW5kZXhdLnN0dWRlbnRJZCxcbiAgICAgICAgdXNlck5hbWU6ICdTdHVkZW50JywgLy8gTmFtZSBub3QgYXZhaWxhYmxlIGhlcmVcbiAgICAgICAgYWN0aW9uOiAnQXR0ZW5kYW5jZSBVcGRhdGVkJyxcbiAgICAgICAgZGV0YWlsczogYEF0dGVuZGFuY2UgJHtpZH0gdXBkYXRlZC4gVGltZW91dDogJHt1cGRhdGVzLnRpbWVPdXR9YFxuICAgICAgfSk7XG4gICAgcmV0dXJuIGF0dGVuZGFuY2VzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gUk9PTVNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSb29tc0FjdGlvbigpOiBQcm9taXNlPFJvb21bXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ3Jvb21zJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRSb29tQWN0aW9uKHJvb206IFJvb20pIHtcbiAgICBjb25zdCByb29tcyA9IGF3YWl0IGdldFJvb21zQWN0aW9uKCk7XG4gICAgcm9vbXMucHVzaChyb29tKTtcbiAgICBhd2FpdCB3cml0ZURiKCdyb29tcycsIHJvb21zKTtcbiAgICByZXR1cm4gcm9vbTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJvb21BY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxSb29tPikge1xuICAgIGNvbnN0IHJvb21zID0gYXdhaXQgZ2V0Um9vbXNBY3Rpb24oKTtcbiAgICBjb25zdCBpbmRleCA9IHJvb21zLmZpbmRJbmRleChyID0+IHIuaWQgPT09IGlkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHJvb21zW2luZGV4XSA9IHsgLi4ucm9vbXNbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3Jvb21zJywgcm9vbXMpO1xuICAgICAgICByZXR1cm4gcm9vbXNbaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVJvb21BY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCByb29tcyA9IGF3YWl0IGdldFJvb21zQWN0aW9uKCk7XG4gICAgcm9vbXMgPSByb29tcy5maWx0ZXIociA9PiByLmlkICE9PSBpZCk7XG4gICAgYXdhaXQgd3JpdGVEYigncm9vbXMnLCByb29tcyk7XG59XG5cbi8vIExBQlNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMYWJzQWN0aW9uKCk6IFByb21pc2U8TGFiW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdsYWJzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRMYWJBY3Rpb24obGFiOiBMYWIpIHtcbiAgICBjb25zdCBsYWJzID0gYXdhaXQgZ2V0TGFic0FjdGlvbigpO1xuICAgIGxhYnMucHVzaChsYWIpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ2xhYnMnLCBsYWJzKTtcbiAgICBcbiAgICAvLyBBdXRvbWF0aWNhbGx5IGFkZCBQQ3MgYmFzZWQgb24gY2FwYWNpdHlcbiAgICBjb25zdCBwY3MgPSBhd2FpdCBnZXRQY3NBY3Rpb24oKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsYWIuY2FwYWNpdHk7IGkrKykge1xuICAgICAgICBwY3MucHVzaCh7XG4gICAgICAgICAgICBpZDogYFBDLSR7bGFiLmlkfS0ke2l9YCxcbiAgICAgICAgICAgIHBjTnVtYmVyOiBpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBsYWJJZDogbGFiLmlkLFxuICAgICAgICAgICAgc3RhdHVzOiAnYXZhaWxhYmxlJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIHBjcyk7XG5cbiAgICByZXR1cm4gbGFiO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGFiQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8TGFiPikge1xuICAgIGNvbnN0IGxhYnMgPSBhd2FpdCBnZXRMYWJzQWN0aW9uKCk7XG4gICAgY29uc3QgaW5kZXggPSBsYWJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IGlkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IG9sZExhYiA9IHsgLi4ubGFic1tpbmRleF0gfTtcbiAgICAgICAgY29uc3QgbmV3TGFiRGF0YSA9IHsgLi4ubGFic1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcblxuICAgICAgICAvLyBJZiBjYXBhY2l0eSBoYXMgY2hhbmdlZCwgdXBkYXRlIFBDc1xuICAgICAgICBpZiAodXBkYXRlcy5jYXBhY2l0eSAhPT0gdW5kZWZpbmVkICYmIHVwZGF0ZXMuY2FwYWNpdHkgIT09IG9sZExhYi5jYXBhY2l0eSkge1xuICAgICAgICAgICAgY29uc3QgbmV3Q2FwYWNpdHkgPSB1cGRhdGVzLmNhcGFjaXR5O1xuICAgICAgICAgICAgY29uc3Qgb2xkQ2FwYWNpdHkgPSBvbGRMYWIuY2FwYWNpdHk7XG4gICAgICAgICAgICBsZXQgYWxsUGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmIChuZXdDYXBhY2l0eSA+IG9sZENhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIG5ldyBQQ3NcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHkgKyAxOyBpIDw9IG5ld0NhcGFjaXR5OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsUGNzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGBQQy0ke2lkfS0ke2l9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBjTnVtYmVyOiBpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJJZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdhdmFpbGFibGUnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBuZXdDYXBhY2l0eSA8IG9sZENhcGFjaXR5XG4gICAgICAgICAgICAgICAgY29uc3QgcGNzRm9yVGhpc0xhYiA9IGFsbFBjcy5maWx0ZXIocGMgPT4gcGMubGFiSWQgPT09IGlkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwY051bWJlcnNUb1JlbW92ZSA9IHBjc0ZvclRoaXNMYWJcbiAgICAgICAgICAgICAgICAgICAgLm1hcChwYyA9PiBwYXJzZUludChwYy5wY051bWJlcikpXG4gICAgICAgICAgICAgICAgICAgIC5zb3J0KChhLGIpID0+IGItYSkgLy8gc29ydCBkZXNjZW5kaW5nXG4gICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCBvbGRDYXBhY2l0eSAtIG5ld0NhcGFjaXR5KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBwY0lkc1RvUmVtb3ZlID0gcGNzRm9yVGhpc0xhYlxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHBjID0+IHBjTnVtYmVyc1RvUmVtb3ZlLmluY2x1ZGVzKHBhcnNlSW50KHBjLnBjTnVtYmVyKSkpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAocGMgPT4gcGMuaWQpO1xuXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0aGUgUENzIHRvIHJlbW92ZVxuICAgICAgICAgICAgICAgIGFsbFBjcyA9IGFsbFBjcy5maWx0ZXIocGMgPT4gIXBjSWRzVG9SZW1vdmUuaW5jbHVkZXMocGMuaWQpKTtcblxuICAgICAgICAgICAgICAgIC8vIEFsc28gcmVtb3ZlIGFueSBwZW5kaW5nL2FwcHJvdmVkIHJlcXVlc3RzIGZvciB0aGVzZSBQQ3NcbiAgICAgICAgICAgICAgICBsZXQgYWxsUmVxdWVzdHMgPSBhd2FpdCBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpO1xuICAgICAgICAgICAgICAgIGFsbFJlcXVlc3RzID0gYWxsUmVxdWVzdHMuZmlsdGVyKHJlcSA9PiAhcGNJZHNUb1JlbW92ZS5pbmNsdWRlcyhyZXEucGNJZCEpKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB3cml0ZURiKCdsYWJyZXF1ZXN0cycsIGFsbFJlcXVlc3RzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIGFsbFBjcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxhYnNbaW5kZXhdID0gbmV3TGFiRGF0YTtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignbGFicycsIGxhYnMpO1xuICAgICAgICByZXR1cm4gbmV3TGFiRGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVMYWJBY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCBsYWJzID0gYXdhaXQgZ2V0TGFic0FjdGlvbigpO1xuICAgIGxhYnMgPSBsYWJzLmZpbHRlcihsID0+IGwuaWQgIT09IGlkKTtcbiAgICBhd2FpdCB3cml0ZURiKCdsYWJzJywgbGFicyk7XG5cbiAgICBsZXQgcGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG4gICAgcGNzID0gcGNzLmZpbHRlcihwYyA9PiBwYy5sYWJJZCAhPT0gaWQpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIHBjcyk7XG59XG5cbi8vIFBDc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBjc0FjdGlvbigpOiBQcm9taXNlPFBjW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdwY3MnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFBjQWN0aW9uKHBjOiBQYykge1xuICAgIGNvbnN0IHBjcyA9IGF3YWl0IGdldFBjc0FjdGlvbigpO1xuICAgIHBjcy5wdXNoKHBjKTtcbiAgICBhd2FpdCB3cml0ZURiKCdwY3MnLCBwY3MpO1xuICAgIHJldHVybiBwYztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBjQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8UGM+KSB7XG4gICAgY29uc3QgcGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG4gICAgY29uc3QgaW5kZXggPSBwY3MuZmluZEluZGV4KHBjID0+IHBjLmlkID09PSBpZCk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBwY3NbaW5kZXhdID0geyAuLi5wY3NbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIHBjcyk7XG4gICAgICAgIHJldHVybiBwY3NbaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLy8gTEFCIFJFUVVFU1RTXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGFiUmVxdWVzdHNBY3Rpb24oKTogUHJvbWlzZTxMYWJSZXF1ZXN0W10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdsYWJyZXF1ZXN0cycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkTGFiUmVxdWVzdEFjdGlvbihyZXF1ZXN0OiBPbWl0PExhYlJlcXVlc3QsICdpZCc+KSB7XG4gICAgY29uc3QgcmVxdWVzdHMgPSBhd2FpdCBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpO1xuICAgIGNvbnN0IG5ld1JlcXVlc3QgPSB7IC4uLnJlcXVlc3QsIGlkOiBgUkVRLSR7RGF0ZS5ub3coKX1gIH07XG4gICAgcmVxdWVzdHMucHVzaChuZXdSZXF1ZXN0KTtcbiAgICBhd2FpdCB3cml0ZURiKCdsYWJyZXF1ZXN0cycsIHJlcXVlc3RzKTtcbiAgICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgICAgIHVzZXJJZDogbmV3UmVxdWVzdC5zdHVkZW50SWQsXG4gICAgICAgIHVzZXJOYW1lOiAnU3R1ZGVudCcsXG4gICAgICAgIGFjdGlvbjogJ0xhYiBSZXF1ZXN0IENyZWF0ZWQnLFxuICAgICAgICBkZXRhaWxzOiBgUmVxdWVzdCBmb3IgTGFiICR7bmV3UmVxdWVzdC5sYWJJZH0gZm9yIHN1YmplY3QgJHtuZXdSZXF1ZXN0LnN1YmplY3RJZH0uYFxuICAgICAgfSk7XG4gICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVMYWJSZXF1ZXN0QWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8TGFiUmVxdWVzdD4pIHtcbiAgY29uc3QgcmVxdWVzdHMgPSBhd2FpdCBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpO1xuICBjb25zdCBpbmRleCA9IHJlcXVlc3RzLmZpbmRJbmRleChyID0+IHIuaWQgPT09IGlkKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHJlcXVlc3RzW2luZGV4XSA9IHsgLi4ucmVxdWVzdHNbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgYXdhaXQgd3JpdGVEYignbGFicmVxdWVzdHMnLCByZXF1ZXN0cyk7XG4gICAgYXdhaXQgYWRkQXVkaXRMb2dBY3Rpb24oe1xuICAgICAgICB1c2VySWQ6IHJlcXVlc3RzW2luZGV4XS50ZWFjaGVySWQsXG4gICAgICAgIHVzZXJOYW1lOiAnVGVhY2hlcicsXG4gICAgICAgIGFjdGlvbjogYExhYiBSZXF1ZXN0ICR7dXBkYXRlcy5zdGF0dXN9YCxcbiAgICAgICAgZGV0YWlsczogYFJlcXVlc3QgJHtpZH0gc3RhdHVzIGNoYW5nZWQgdG8gJHt1cGRhdGVzLnN0YXR1c30uYFxuICAgICAgfSk7XG4gICAgcmV0dXJuIHJlcXVlc3RzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gQVVESVQgTE9HXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXVkaXRMb2dzQWN0aW9uKCk6IFByb21pc2U8QXVkaXRMb2dbXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ2F1ZGl0bG9nJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRBdWRpdExvZ0FjdGlvbihsb2c6IE9taXQ8QXVkaXRMb2csICdpZCcgfCAndGltZXN0YW1wJz4pIHtcbiAgICBjb25zdCBsb2dzID0gYXdhaXQgZ2V0QXVkaXRMb2dzQWN0aW9uKCk7XG4gICAgY29uc3QgbmV3TG9nID0geyBcbiAgICAgICAgLi4ubG9nLCBcbiAgICAgICAgaWQ6IGBMT0ctJHtEYXRlLm5vdygpfWAsIFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSBcbiAgICB9O1xuICAgIGxvZ3MudW5zaGlmdChuZXdMb2cpOyAvLyBBZGQgdG8gdGhlIGJlZ2lubmluZ1xuICAgIGF3YWl0IHdyaXRlRGIoJ2F1ZGl0bG9nJywgbG9ncyk7XG4gICAgcmV0dXJuIG5ld0xvZztcbn1cblxuLy8gU0VUVElOR1NcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5nc0FjdGlvbigpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ3NldHRpbmdzJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpZiBzZXR0aW5ncyBkbyBub3QgZXhpc3QsIGNyZWF0ZSBpdFxuICAgICAgICBjb25zdCBkZWZhdWx0U2V0dGluZ3MgPSB7IHRlYWNoZXJTZWNyZXQ6IFwiY2hhbmdlbWVcIiB9O1xuICAgICAgICBhd2FpdCB3cml0ZURiKCdzZXR0aW5ncycsIGRlZmF1bHRTZXR0aW5ncyk7XG4gICAgICAgIHJldHVybiBkZWZhdWx0U2V0dGluZ3M7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2V0dGluZ3NBY3Rpb24odXBkYXRlczogYW55KSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBnZXRTZXR0aW5nc0FjdGlvbigpO1xuICAgIGNvbnN0IHVwZGF0ZWRTZXR0aW5ncyA9IHsgLi4uc2V0dGluZ3MsIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCdzZXR0aW5ncycsIHVwZGF0ZWRTZXR0aW5ncyk7XG4gICAgcmV0dXJuIHVwZGF0ZWRTZXR0aW5ncztcbn1cblxuLy8gQk9PS1NcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRCb29rc0FjdGlvbigpOiBQcm9taXNlPEJvb2tbXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ2Jvb2tzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRCb29rQWN0aW9uKGJvb2s6IE9taXQ8Qm9vaywgJ2lkJz4pIHtcbiAgICBjb25zdCBib29rcyA9IGF3YWl0IGdldEJvb2tzQWN0aW9uKCk7XG4gICAgY29uc3QgbmV3Qm9vayA9IHsgLi4uYm9vaywgaWQ6IGBCT09LLSR7RGF0ZS5ub3coKX1gfTtcbiAgICBib29rcy5wdXNoKG5ld0Jvb2spO1xuICAgIGF3YWl0IHdyaXRlRGIoJ2Jvb2tzJywgYm9va3MpO1xuICAgIHJldHVybiBuZXdCb29rO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlQm9va0FjdGlvbihpZDogc3RyaW5nLCB1cGRhdGVzOiBQYXJ0aWFsPEJvb2s+KSB7XG4gICAgY29uc3QgYm9va3MgPSBhd2FpdCBnZXRCb29rc0FjdGlvbigpO1xuICAgIGNvbnN0IGluZGV4ID0gYm9va3MuZmluZEluZGV4KGIgPT4gYi5pZCA9PT0gaWQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgYm9va3NbaW5kZXhdID0geyAuLi5ib29rc1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignYm9va3MnLCBib29rcyk7XG4gICAgICAgIHJldHVybiBib29rc1tpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQm9va0FjdGlvbihpZDogc3RyaW5nKSB7XG4gICAgbGV0IGJvb2tzID0gYXdhaXQgZ2V0Qm9va3NBY3Rpb24oKTtcbiAgICBib29rcyA9IGJvb2tzLmZpbHRlcihiID0+IGIuaWQgIT09IGlkKTtcbiAgICBhd2FpdCB3cml0ZURiKCdib29rcycsIGJvb2tzKTtcbn1cblxuLy8gTElCUkFSWSBCT1JST1dJTkdTXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlicmFyeUJvcnJvd2luZ3NBY3Rpb24oKTogUHJvbWlzZTxMaWJyYXJ5Qm9ycm93aW5nW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdsaWJyYXJ5Ym9ycm93aW5ncycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkTGlicmFyeUJvcnJvd2luZ0FjdGlvbihib3Jyb3dpbmc6IE9taXQ8TGlicmFyeUJvcnJvd2luZywgJ2lkJz4pIHtcbiAgICBjb25zdCBib3Jyb3dpbmdzID0gYXdhaXQgZ2V0TGlicmFyeUJvcnJvd2luZ3NBY3Rpb24oKTtcbiAgICBjb25zdCBuZXdCb3Jyb3dpbmcgPSB7IC4uLmJvcnJvd2luZywgaWQ6IGBMQi0ke0RhdGUubm93KCl9YH07XG4gICAgYm9ycm93aW5ncy5wdXNoKG5ld0JvcnJvd2luZyk7XG4gICAgYXdhaXQgd3JpdGVEYignbGlicmFyeWJvcnJvd2luZ3MnLCBib3Jyb3dpbmdzKTtcbiAgICByZXR1cm4gbmV3Qm9ycm93aW5nO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlicmFyeUJvcnJvd2luZ0FjdGlvbihpZDogc3RyaW5nLCB1cGRhdGVzOiBQYXJ0aWFsPExpYnJhcnlCb3Jyb3dpbmc+KSB7XG4gICAgY29uc3QgYm9ycm93aW5ncyA9IGF3YWl0IGdldExpYnJhcnlCb3Jyb3dpbmdzQWN0aW9uKCk7XG4gICAgY29uc3QgaW5kZXggPSBib3Jyb3dpbmdzLmZpbmRJbmRleChiID0+IGIuaWQgPT09IGlkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGJvcnJvd2luZ3NbaW5kZXhdID0geyAuLi5ib3Jyb3dpbmdzW2luZGV4XSwgLi4udXBkYXRlcyB9O1xuICAgICAgICBhd2FpdCB3cml0ZURiKCdsaWJyYXJ5Ym9ycm93aW5ncycsIGJvcnJvd2luZ3MpO1xuICAgICAgICByZXR1cm4gYm9ycm93aW5nc1tpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5cbi8vIEJPUlJPVyBSRVFVRVNUU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEJvcnJvd1JlcXVlc3RzQWN0aW9uKCk6IFByb21pc2U8Qm9ycm93UmVxdWVzdFtdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHJlYWREYignYm9ycm93cmVxdWVzdHMnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZEJvcnJvd1JlcXVlc3RBY3Rpb24ocmVxdWVzdDogT21pdDxCb3Jyb3dSZXF1ZXN0LCAnaWQnPikge1xuICAgIGNvbnN0IHJlcXVlc3RzID0gYXdhaXQgZ2V0Qm9ycm93UmVxdWVzdHNBY3Rpb24oKTtcbiAgICBjb25zdCBuZXdSZXF1ZXN0ID0geyAuLi5yZXF1ZXN0LCBpZDogYEJSLSR7RGF0ZS5ub3coKX1gIH07XG4gICAgcmVxdWVzdHMucHVzaChuZXdSZXF1ZXN0KTtcbiAgICBhd2FpdCB3cml0ZURiKCdib3Jyb3dyZXF1ZXN0cycsIHJlcXVlc3RzKTtcbiAgICByZXR1cm4gbmV3UmVxdWVzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUJvcnJvd1JlcXVlc3RBY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxCb3Jyb3dSZXF1ZXN0Pikge1xuICBjb25zdCByZXF1ZXN0cyA9IGF3YWl0IGdldEJvcnJvd1JlcXVlc3RzQWN0aW9uKCk7XG4gIGNvbnN0IGluZGV4ID0gcmVxdWVzdHMuZmluZEluZGV4KHIgPT4gci5pZCA9PT0gaWQpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgcmVxdWVzdHNbaW5kZXhdID0geyAuLi5yZXF1ZXN0c1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCdib3Jyb3dyZXF1ZXN0cycsIHJlcXVlc3RzKTtcbiAgICByZXR1cm4gcmVxdWVzdHNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5cbi8vIFJFU0VSVkFUSU9OU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFJlc2VydmF0aW9uc0FjdGlvbigpOiBQcm9taXNlPFJlc2VydmF0aW9uW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdyZXNlcnZhdGlvbnMnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFJlc2VydmF0aW9uQWN0aW9uKHJlc2VydmF0aW9uOiBPbWl0PFJlc2VydmF0aW9uLCAnaWQnPikge1xuICAgIGNvbnN0IHJlc2VydmF0aW9ucyA9IGF3YWl0IGdldFJlc2VydmF0aW9uc0FjdGlvbigpO1xuICAgIGNvbnN0IG5ld1Jlc2VydmF0aW9uID0geyAuLi5yZXNlcnZhdGlvbiwgaWQ6IGBSRVMtJHtEYXRlLm5vdygpfWB9O1xuICAgIHJlc2VydmF0aW9ucy5wdXNoKG5ld1Jlc2VydmF0aW9uKTtcbiAgICBhd2FpdCB3cml0ZURiKCdyZXNlcnZhdGlvbnMnLCByZXNlcnZhdGlvbnMpO1xuICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgdXNlcklkOiBuZXdSZXNlcnZhdGlvbi50ZWFjaGVySWQsXG4gICAgICAgIHVzZXJOYW1lOiAnVGVhY2hlcicsXG4gICAgICAgIGFjdGlvbjogJ1Jlc2VydmF0aW9uIENyZWF0ZWQnLFxuICAgICAgICBkZXRhaWxzOiBgUmVzZXJ2ZWQgJHtuZXdSZXNlcnZhdGlvbi5sb2NhdGlvblR5cGV9ICR7bmV3UmVzZXJ2YXRpb24ubG9jYXRpb25JZH0gZm9yIHN1YmplY3QgJHtuZXdSZXNlcnZhdGlvbi5zdWJqZWN0SWR9IG9uICR7bmV3UmVzZXJ2YXRpb24uZGF0ZX0uYFxuICAgICAgfSk7XG4gICAgcmV0dXJuIG5ld1Jlc2VydmF0aW9uO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUmVzZXJ2YXRpb25BY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCByZXNlcnZhdGlvbnMgPSBhd2FpdCBnZXRSZXNlcnZhdGlvbnNBY3Rpb24oKTtcbiAgICBjb25zdCByZXNUb0RlbGV0ZSA9IHJlc2VydmF0aW9ucy5maW5kKHIgPT4gci5pZCA9PT0gaWQpO1xuICAgIGlmKHJlc1RvRGVsZXRlKSB7XG4gICAgICAgIHJlc2VydmF0aW9ucyA9IHJlc2VydmF0aW9ucy5maWx0ZXIociA9PiByLmlkICE9PSBpZCk7XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3Jlc2VydmF0aW9ucycsIHJlc2VydmF0aW9ucyk7XG4gICAgICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgICAgIHVzZXJJZDogcmVzVG9EZWxldGUudGVhY2hlcklkLFxuICAgICAgICAgICAgdXNlck5hbWU6ICdUZWFjaGVyJyxcbiAgICAgICAgICAgIGFjdGlvbjogJ1Jlc2VydmF0aW9uIERlbGV0ZWQnLFxuICAgICAgICAgICAgZGV0YWlsczogYERlbGV0ZWQgcmVzZXJ2YXRpb24gJHtpZH0uYFxuICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoibVNBZ0JzQiJ9
}),
"[project]/src/app/actions/data:61d1ce [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0096451ed85f5ac9d34b7defc21c02708e0162bcd8":"getUsersAction"},"src/app/actions/dbActions.ts",""] */ __turbopack_context__.s([
    "getUsersAction",
    ()=>getUsersAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var getUsersAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("0096451ed85f5ac9d34b7defc21c02708e0162bcd8", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getUsersAction"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZGJBY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuJ3VzZSBzZXJ2ZXInO1xuXG5pbXBvcnQgeyByZWFkRGIsIHdyaXRlRGIsIHNhdmVQcm9maWxlSW1hZ2UgfSBmcm9tICdAL2xpYi9kYic7XG5pbXBvcnQgeyBVc2VyLCBTdWJqZWN0LCBFbnJvbGxtZW50LCBBdHRlbmRhbmNlLCBMYWIsIFBjLCBMYWJSZXF1ZXN0LCBBdWRpdExvZywgQm9vaywgTGlicmFyeUJvcnJvd2luZywgUm9vbSwgUmVzZXJ2YXRpb24sIEJvcnJvd1JlcXVlc3QgfSBmcm9tICdAL3V0aWxzL3N0b3JhZ2UnO1xuXG4vLyBVU0VSU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJzQWN0aW9uKCk6IFByb21pc2U8VXNlcltdPiB7XG4gIHJldHVybiBhd2FpdCByZWFkRGIoJ3VzZXJzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyQnlJZEFjdGlvbihpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyIHwgbnVsbD4ge1xuICBjb25zdCB1c2VycyA9IGF3YWl0IGdldFVzZXJzQWN0aW9uKCk7XG4gIHJldHVybiB1c2Vycy5maW5kKHUgPT4gdS5pZCA9PT0gaWQpIHx8IG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRVc2VyQWN0aW9uKHVzZXI6IFVzZXIpIHtcbiAgY29uc3QgdXNlcnMgPSBhd2FpdCByZWFkRGIoJ3VzZXJzJyk7XG4gIHVzZXJzLnB1c2godXNlcik7XG4gIGF3YWl0IHdyaXRlRGIoJ3VzZXJzJywgdXNlcnMpO1xuICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgdXNlcklkOiAnYWRtaW4nLFxuICAgIHVzZXJOYW1lOiAnU3lzdGVtJyxcbiAgICBhY3Rpb246ICdVc2VyIENyZWF0ZWQnLFxuICAgIGRldGFpbHM6IGBVc2VyICR7dXNlci5uYW1lfSAoJHt1c2VyLmlkfSkgd2FzIGNyZWF0ZWQuYFxuICB9KTtcbiAgcmV0dXJuIHVzZXI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVVc2VyQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8VXNlcj4pIHtcbiAgY29uc3QgdXNlcnMgPSBhd2FpdCBnZXRVc2Vyc0FjdGlvbigpO1xuICBjb25zdCBpbmRleCA9IHVzZXJzLmZpbmRJbmRleCh1ID0+IHUuaWQgPT09IGlkKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIGlmICh1cGRhdGVzLnByb2ZpbGVQaWMgJiYgdXBkYXRlcy5wcm9maWxlUGljLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgIGNvbnN0IG5ld1BhdGggPSBhd2FpdCBzYXZlUHJvZmlsZUltYWdlKGlkLCB1cGRhdGVzLnByb2ZpbGVQaWMpO1xuICAgICAgaWYgKG5ld1BhdGgpIHVwZGF0ZXMucHJvZmlsZVBpYyA9IG5ld1BhdGg7XG4gICAgfVxuICAgIFxuICAgIHVzZXJzW2luZGV4XSA9IHsgLi4udXNlcnNbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgYXdhaXQgd3JpdGVEYigndXNlcnMnLCB1c2Vycyk7XG4gICAgYXdhaXQgYWRkQXVkaXRMb2dBY3Rpb24oe1xuICAgICAgdXNlcklkOiBpZCxcbiAgICAgIHVzZXJOYW1lOiB1c2Vyc1tpbmRleF0ubmFtZSxcbiAgICAgIGFjdGlvbjogJ1Byb2ZpbGUgVXBkYXRlZCcsXG4gICAgICBkZXRhaWxzOiBgVXNlciBwcm9maWxlIGZvciAke3VzZXJzW2luZGV4XS5uYW1lfSB3YXMgdXBkYXRlZC5gXG4gICAgfSk7XG4gICAgcmV0dXJuIHVzZXJzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVVzZXJBY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCB1c2VycyA9IGF3YWl0IGdldFVzZXJzQWN0aW9uKCk7XG4gICAgY29uc3QgdXNlclRvRGVsZXRlID0gdXNlcnMuZmluZCh1ID0+IHUuaWQgPT09IGlkKTtcbiAgICBpZih1c2VyVG9EZWxldGUpIHtcbiAgICAgICAgdXNlcnMgPSB1c2Vycy5maWx0ZXIodSA9PiB1LmlkICE9PSBpZCk7XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3VzZXJzJywgdXNlcnMpO1xuICAgICAgICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgICAgICAgICB1c2VySWQ6ICdhZG1pbicsXG4gICAgICAgICAgICB1c2VyTmFtZTogJ1N5c3RlbScsXG4gICAgICAgICAgICBhY3Rpb246ICdVc2VyIERlbGV0ZWQnLFxuICAgICAgICAgICAgZGV0YWlsczogYFVzZXIgJHt1c2VyVG9EZWxldGUubmFtZX0gKCR7aWR9KSB3YXMgZGVsZXRlZC5gXG4gICAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vLyBTVUJKRUNUU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN1YmplY3RzQWN0aW9uKCk6IFByb21pc2U8U3ViamVjdFtdPiB7XG4gIHJldHVybiBhd2FpdCByZWFkRGIoJ3N1YmplY3RzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTdWJqZWN0QWN0aW9uKHN1YmplY3Q6IFN1YmplY3QpIHtcbiAgY29uc3Qgc3ViamVjdHMgPSBhd2FpdCByZWFkRGIoJ3N1YmplY3RzJyk7XG4gIHN1YmplY3RzLnB1c2goc3ViamVjdCk7XG4gIGF3YWl0IHdyaXRlRGIoJ3N1YmplY3RzJywgc3ViamVjdHMpO1xuICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgdXNlcklkOiBzdWJqZWN0LnRlYWNoZXJJZCxcbiAgICB1c2VyTmFtZTogc3ViamVjdC50ZWFjaGVyTmFtZSxcbiAgICBhY3Rpb246ICdTdWJqZWN0IEFkZGVkJyxcbiAgICBkZXRhaWxzOiBgU3ViamVjdCBcIiR7c3ViamVjdC5uYW1lfVwiIHdhcyBhZGRlZC5gXG4gIH0pO1xuICByZXR1cm4gc3ViamVjdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVN1YmplY3RBY3Rpb24oc3ViamVjdDogU3ViamVjdCkge1xuICAgIGNvbnN0IHN1YmplY3RzID0gYXdhaXQgZ2V0U3ViamVjdHNBY3Rpb24oKTtcbiAgICBjb25zdCBpbmRleCA9IHN1YmplY3RzLmZpbmRJbmRleChzID0+IHMuaWQgPT09IHN1YmplY3QuaWQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgc3ViamVjdHNbaW5kZXhdID0gc3ViamVjdDtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignc3ViamVjdHMnLCBzdWJqZWN0cyk7XG4gICAgICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgICAgIHVzZXJJZDogc3ViamVjdC50ZWFjaGVySWQsXG4gICAgICAgICAgICB1c2VyTmFtZTogc3ViamVjdC50ZWFjaGVyTmFtZSxcbiAgICAgICAgICAgIGFjdGlvbjogJ1N1YmplY3QgVXBkYXRlZCcsXG4gICAgICAgICAgICBkZXRhaWxzOiBgU3ViamVjdCBcIiR7c3ViamVjdC5uYW1lfVwiIHdhcyB1cGRhdGVkLmBcbiAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1YmplY3RzW2luZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVTdWJqZWN0QWN0aW9uKHN1YmplY3RJZDogc3RyaW5nKSB7XG4gICAgbGV0IHN1YmplY3RzID0gYXdhaXQgZ2V0U3ViamVjdHNBY3Rpb24oKTtcbiAgICBjb25zdCBzdWJqZWN0VG9EZWxldGUgPSBzdWJqZWN0cy5maW5kKHMgPT4gcy5pZCA9PT0gc3ViamVjdElkKTtcbiAgICBpZiAoc3ViamVjdFRvRGVsZXRlKSB7XG4gICAgICAgIHN1YmplY3RzID0gc3ViamVjdHMuZmlsdGVyKHMgPT4gcy5pZCAhPT0gc3ViamVjdElkKTtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignc3ViamVjdHMnLCBzdWJqZWN0cyk7XG4gICAgICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgICAgIHVzZXJJZDogc3ViamVjdFRvRGVsZXRlLnRlYWNoZXJJZCxcbiAgICAgICAgICAgIHVzZXJOYW1lOiBzdWJqZWN0VG9EZWxldGUudGVhY2hlck5hbWUsXG4gICAgICAgICAgICBhY3Rpb246ICdTdWJqZWN0IERlbGV0ZWQnLFxuICAgICAgICAgICAgZGV0YWlsczogYFN1YmplY3QgXCIke3N1YmplY3RUb0RlbGV0ZS5uYW1lfVwiIHdhcyBkZWxldGVkLmBcbiAgICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gRU5ST0xMTUVOVFNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRFbnJvbGxtZW50c0FjdGlvbigpOiBQcm9taXNlPEVucm9sbG1lbnRbXT4ge1xuICByZXR1cm4gYXdhaXQgcmVhZERiKCdlbnJvbGxtZW50cycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkRW5yb2xsbWVudEFjdGlvbihlbnJvbGxtZW50OiBFbnJvbGxtZW50KSB7XG4gIGNvbnN0IGVucm9sbG1lbnRzID0gYXdhaXQgcmVhZERiKCdlbnJvbGxtZW50cycpO1xuICBlbnJvbGxtZW50cy5wdXNoKGVucm9sbG1lbnQpO1xuICBhd2FpdCB3cml0ZURiKCdlbnJvbGxtZW50cycsIGVucm9sbG1lbnRzKTtcbiAgYXdhaXQgYWRkQXVkaXRMb2dBY3Rpb24oe1xuICAgIHVzZXJJZDogZW5yb2xsbWVudC5zdHVkZW50SWQsXG4gICAgdXNlck5hbWU6ICdTdHVkZW50JywgLy8gTmFtZSBub3QgYXZhaWxhYmxlIGhlcmVcbiAgICBhY3Rpb246ICdFbnJvbGxtZW50IFJlcXVlc3QnLFxuICAgIGRldGFpbHM6IGBTdHVkZW50ICR7ZW5yb2xsbWVudC5zdHVkZW50SWR9IHJlcXVlc3RlZCB0byBlbnJvbGwgaW4gc3ViamVjdCAke2Vucm9sbG1lbnQuc3ViamVjdElkfS5gXG4gIH0pO1xuICByZXR1cm4gZW5yb2xsbWVudDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUVucm9sbG1lbnRBY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxFbnJvbGxtZW50Pikge1xuICBjb25zdCBlbnJvbGxtZW50cyA9IGF3YWl0IGdldEVucm9sbG1lbnRzQWN0aW9uKCk7XG4gIGNvbnN0IGluZGV4ID0gZW5yb2xsbWVudHMuZmluZEluZGV4KGUgPT4gZS5pZCA9PT0gaWQpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZW5yb2xsbWVudHNbaW5kZXhdID0geyAuLi5lbnJvbGxtZW50c1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCdlbnJvbGxtZW50cycsIGVucm9sbG1lbnRzKTtcbiAgICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgICAgIHVzZXJJZDogJ3RlYWNoZXInLCAvLyBBc3N1bWUgYSB0ZWFjaGVyIGlzIGRvaW5nIHRoaXNcbiAgICAgICAgdXNlck5hbWU6ICdUZWFjaGVyJyxcbiAgICAgICAgYWN0aW9uOiBgRW5yb2xsbWVudCAke3VwZGF0ZXMuc3RhdHVzfWAsXG4gICAgICAgIGRldGFpbHM6IGBFbnJvbGxtZW50ICR7aWR9IHN0YXR1cyBjaGFuZ2VkIHRvICR7dXBkYXRlcy5zdGF0dXN9LmBcbiAgICAgIH0pO1xuICAgIHJldHVybiBlbnJvbGxtZW50c1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIEFUVEVOREFOQ0VcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBdHRlbmRhbmNlc0FjdGlvbigpOiBQcm9taXNlPEF0dGVuZGFuY2VbXT4ge1xuICByZXR1cm4gYXdhaXQgcmVhZERiKCdhdHRlbmRhbmNlJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRBdHRlbmRhbmNlQWN0aW9uKGF0dGVuZGFuY2U6IE9taXQ8QXR0ZW5kYW5jZSwgJ2lkJz4pIHtcbiAgICBjb25zdCBhdHRlbmRhbmNlcyA9IGF3YWl0IHJlYWREYignYXR0ZW5kYW5jZScpO1xuICAgIGNvbnN0IG5ld0F0dGVuZGFuY2UgPSB7IC4uLmF0dGVuZGFuY2UsIGlkOiBgQVRULSR7RGF0ZS5ub3coKX1gIH07XG4gICAgYXR0ZW5kYW5jZXMucHVzaChuZXdBdHRlbmRhbmNlKTtcbiAgICBhd2FpdCB3cml0ZURiKCdhdHRlbmRhbmNlJywgYXR0ZW5kYW5jZXMpO1xuXG4gICAgLy8gSWYgYSBQQyB3YXMgYXNzaWduZWQsIHVwZGF0ZSBpdHMgc3RhdHVzXG4gICAgaWYgKG5ld0F0dGVuZGFuY2UucGNJZCkge1xuICAgICAgICBhd2FpdCB1cGRhdGVQY0FjdGlvbihuZXdBdHRlbmRhbmNlLnBjSWQsIHsgc3RhdHVzOiAnb2NjdXBpZWQnIH0pO1xuICAgIH1cbiAgICBcbiAgICAvLyBDcmVhdGUgYSBtb3JlIGRldGFpbGVkIGF1ZGl0IGxvZ1xuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgcmVhZERiKCd1c2VycycpO1xuICAgIGNvbnN0IHN0dWRlbnQgPSB1c2Vycy5maW5kKHUgPT4gdS5pZCA9PT0gbmV3QXR0ZW5kYW5jZS5zdHVkZW50SWQpO1xuICAgIGNvbnN0IHN1YmplY3RzID0gYXdhaXQgcmVhZERiKCdzdWJqZWN0cycpO1xuICAgIGNvbnN0IHN1YmplY3QgPSBzdWJqZWN0cy5maW5kKHMgPT4gcy5pZCA9PT0gbmV3QXR0ZW5kYW5jZS5zdWJqZWN0SWQpO1xuXG4gICAgbGV0IGxvY2F0aW9uRGV0YWlscyA9ICcnO1xuICAgIGlmIChuZXdBdHRlbmRhbmNlLmxvY2F0aW9uSWQgJiYgbmV3QXR0ZW5kYW5jZS5sb2NhdGlvblR5cGUpIHtcbiAgICAgICAgaWYgKG5ld0F0dGVuZGFuY2UubG9jYXRpb25UeXBlID09PSAnbGFiJykge1xuICAgICAgICAgICAgY29uc3QgbGFicyA9IGF3YWl0IHJlYWREYignbGFicycpO1xuICAgICAgICAgICAgY29uc3QgbGFiID0gbGFicy5maW5kKGwgPT4gbC5pZCA9PT0gbmV3QXR0ZW5kYW5jZS5sb2NhdGlvbklkKTtcbiAgICAgICAgICAgIGxvY2F0aW9uRGV0YWlscyA9IGAgaW4gJHtsYWI/Lm5hbWUgfHwgJ2xhYid9YDtcbiAgICAgICAgICAgIGlmIChuZXdBdHRlbmRhbmNlLnBjSWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwY051bWJlciA9IG5ld0F0dGVuZGFuY2UucGNJZC5zcGxpdCgnLScpLnBvcCgpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uRGV0YWlscyArPSBgIChQQzogJHtwY051bWJlcn0pYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gcm9vbVxuICAgICAgICAgICAgY29uc3Qgcm9vbXMgPSBhd2FpdCByZWFkRGIoJ3Jvb21zJyk7XG4gICAgICAgICAgICBjb25zdCByb29tID0gcm9vbXMuZmluZChyID0+IHIuaWQgPT09IG5ld0F0dGVuZGFuY2UubG9jYXRpb25JZCk7XG4gICAgICAgICAgICBsb2NhdGlvbkRldGFpbHMgPSBgIGluICR7cm9vbT8ubmFtZSB8fCAncm9vbSd9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgdXNlcklkOiBuZXdBdHRlbmRhbmNlLnN0dWRlbnRJZCxcbiAgICAgICAgdXNlck5hbWU6IHN0dWRlbnQ/Lm5hbWUgfHwgJ1N0dWRlbnQnLFxuICAgICAgICBhY3Rpb246ICdBdHRlbmRhbmNlIE1hcmtlZCcsXG4gICAgICAgIGRldGFpbHM6IGBNYXJrZWQgJHtuZXdBdHRlbmRhbmNlLnN0YXR1c30gZm9yIHN1YmplY3QgJHtzdWJqZWN0Py5uYW1lIHx8IG5ld0F0dGVuZGFuY2Uuc3ViamVjdElkfSR7bG9jYXRpb25EZXRhaWxzfS5gXG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIG5ld0F0dGVuZGFuY2U7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUF0dGVuZGFuY2VBY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxBdHRlbmRhbmNlPikge1xuICBjb25zdCBhdHRlbmRhbmNlcyA9IGF3YWl0IGdldEF0dGVuZGFuY2VzQWN0aW9uKCk7XG4gIGNvbnN0IGluZGV4ID0gYXR0ZW5kYW5jZXMuZmluZEluZGV4KGEgPT4gYS5pZCA9PT0gaWQpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxBdHRlbmRhbmNlID0geyAuLi5hdHRlbmRhbmNlc1tpbmRleF0gfTtcbiAgICBhdHRlbmRhbmNlc1tpbmRleF0gPSB7IC4uLm9yaWdpbmFsQXR0ZW5kYW5jZSwgLi4udXBkYXRlcyB9O1xuICAgIGF3YWl0IHdyaXRlRGIoJ2F0dGVuZGFuY2UnLCBhdHRlbmRhbmNlcyk7XG5cbiAgICAvLyBJZiB0aW1pbmcgb3V0IGFuZCB0aGVyZSB3YXMgYSBwY0lkLCBmcmVlIHVwIHRoZSBQQ1xuICAgIGlmICh1cGRhdGVzLnRpbWVPdXQgJiYgb3JpZ2luYWxBdHRlbmRhbmNlLnBjSWQpIHtcbiAgICAgICAgYXdhaXQgdXBkYXRlUGNBY3Rpb24ob3JpZ2luYWxBdHRlbmRhbmNlLnBjSWQsIHsgc3RhdHVzOiAnYXZhaWxhYmxlJyB9KTtcbiAgICB9XG5cbiAgICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgICAgIHVzZXJJZDogYXR0ZW5kYW5jZXNbaW5kZXhdLnN0dWRlbnRJZCxcbiAgICAgICAgdXNlck5hbWU6ICdTdHVkZW50JywgLy8gTmFtZSBub3QgYXZhaWxhYmxlIGhlcmVcbiAgICAgICAgYWN0aW9uOiAnQXR0ZW5kYW5jZSBVcGRhdGVkJyxcbiAgICAgICAgZGV0YWlsczogYEF0dGVuZGFuY2UgJHtpZH0gdXBkYXRlZC4gVGltZW91dDogJHt1cGRhdGVzLnRpbWVPdXR9YFxuICAgICAgfSk7XG4gICAgcmV0dXJuIGF0dGVuZGFuY2VzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gUk9PTVNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSb29tc0FjdGlvbigpOiBQcm9taXNlPFJvb21bXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ3Jvb21zJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRSb29tQWN0aW9uKHJvb206IFJvb20pIHtcbiAgICBjb25zdCByb29tcyA9IGF3YWl0IGdldFJvb21zQWN0aW9uKCk7XG4gICAgcm9vbXMucHVzaChyb29tKTtcbiAgICBhd2FpdCB3cml0ZURiKCdyb29tcycsIHJvb21zKTtcbiAgICByZXR1cm4gcm9vbTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJvb21BY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxSb29tPikge1xuICAgIGNvbnN0IHJvb21zID0gYXdhaXQgZ2V0Um9vbXNBY3Rpb24oKTtcbiAgICBjb25zdCBpbmRleCA9IHJvb21zLmZpbmRJbmRleChyID0+IHIuaWQgPT09IGlkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHJvb21zW2luZGV4XSA9IHsgLi4ucm9vbXNbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3Jvb21zJywgcm9vbXMpO1xuICAgICAgICByZXR1cm4gcm9vbXNbaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVJvb21BY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCByb29tcyA9IGF3YWl0IGdldFJvb21zQWN0aW9uKCk7XG4gICAgcm9vbXMgPSByb29tcy5maWx0ZXIociA9PiByLmlkICE9PSBpZCk7XG4gICAgYXdhaXQgd3JpdGVEYigncm9vbXMnLCByb29tcyk7XG59XG5cbi8vIExBQlNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMYWJzQWN0aW9uKCk6IFByb21pc2U8TGFiW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdsYWJzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRMYWJBY3Rpb24obGFiOiBMYWIpIHtcbiAgICBjb25zdCBsYWJzID0gYXdhaXQgZ2V0TGFic0FjdGlvbigpO1xuICAgIGxhYnMucHVzaChsYWIpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ2xhYnMnLCBsYWJzKTtcbiAgICBcbiAgICAvLyBBdXRvbWF0aWNhbGx5IGFkZCBQQ3MgYmFzZWQgb24gY2FwYWNpdHlcbiAgICBjb25zdCBwY3MgPSBhd2FpdCBnZXRQY3NBY3Rpb24oKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsYWIuY2FwYWNpdHk7IGkrKykge1xuICAgICAgICBwY3MucHVzaCh7XG4gICAgICAgICAgICBpZDogYFBDLSR7bGFiLmlkfS0ke2l9YCxcbiAgICAgICAgICAgIHBjTnVtYmVyOiBpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBsYWJJZDogbGFiLmlkLFxuICAgICAgICAgICAgc3RhdHVzOiAnYXZhaWxhYmxlJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIHBjcyk7XG5cbiAgICByZXR1cm4gbGFiO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGFiQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8TGFiPikge1xuICAgIGNvbnN0IGxhYnMgPSBhd2FpdCBnZXRMYWJzQWN0aW9uKCk7XG4gICAgY29uc3QgaW5kZXggPSBsYWJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IGlkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IG9sZExhYiA9IHsgLi4ubGFic1tpbmRleF0gfTtcbiAgICAgICAgY29uc3QgbmV3TGFiRGF0YSA9IHsgLi4ubGFic1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcblxuICAgICAgICAvLyBJZiBjYXBhY2l0eSBoYXMgY2hhbmdlZCwgdXBkYXRlIFBDc1xuICAgICAgICBpZiAodXBkYXRlcy5jYXBhY2l0eSAhPT0gdW5kZWZpbmVkICYmIHVwZGF0ZXMuY2FwYWNpdHkgIT09IG9sZExhYi5jYXBhY2l0eSkge1xuICAgICAgICAgICAgY29uc3QgbmV3Q2FwYWNpdHkgPSB1cGRhdGVzLmNhcGFjaXR5O1xuICAgICAgICAgICAgY29uc3Qgb2xkQ2FwYWNpdHkgPSBvbGRMYWIuY2FwYWNpdHk7XG4gICAgICAgICAgICBsZXQgYWxsUGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmIChuZXdDYXBhY2l0eSA+IG9sZENhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIG5ldyBQQ3NcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHkgKyAxOyBpIDw9IG5ld0NhcGFjaXR5OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsUGNzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGBQQy0ke2lkfS0ke2l9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBjTnVtYmVyOiBpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJJZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdhdmFpbGFibGUnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBuZXdDYXBhY2l0eSA8IG9sZENhcGFjaXR5XG4gICAgICAgICAgICAgICAgY29uc3QgcGNzRm9yVGhpc0xhYiA9IGFsbFBjcy5maWx0ZXIocGMgPT4gcGMubGFiSWQgPT09IGlkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwY051bWJlcnNUb1JlbW92ZSA9IHBjc0ZvclRoaXNMYWJcbiAgICAgICAgICAgICAgICAgICAgLm1hcChwYyA9PiBwYXJzZUludChwYy5wY051bWJlcikpXG4gICAgICAgICAgICAgICAgICAgIC5zb3J0KChhLGIpID0+IGItYSkgLy8gc29ydCBkZXNjZW5kaW5nXG4gICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCBvbGRDYXBhY2l0eSAtIG5ld0NhcGFjaXR5KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBwY0lkc1RvUmVtb3ZlID0gcGNzRm9yVGhpc0xhYlxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHBjID0+IHBjTnVtYmVyc1RvUmVtb3ZlLmluY2x1ZGVzKHBhcnNlSW50KHBjLnBjTnVtYmVyKSkpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAocGMgPT4gcGMuaWQpO1xuXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0aGUgUENzIHRvIHJlbW92ZVxuICAgICAgICAgICAgICAgIGFsbFBjcyA9IGFsbFBjcy5maWx0ZXIocGMgPT4gIXBjSWRzVG9SZW1vdmUuaW5jbHVkZXMocGMuaWQpKTtcblxuICAgICAgICAgICAgICAgIC8vIEFsc28gcmVtb3ZlIGFueSBwZW5kaW5nL2FwcHJvdmVkIHJlcXVlc3RzIGZvciB0aGVzZSBQQ3NcbiAgICAgICAgICAgICAgICBsZXQgYWxsUmVxdWVzdHMgPSBhd2FpdCBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpO1xuICAgICAgICAgICAgICAgIGFsbFJlcXVlc3RzID0gYWxsUmVxdWVzdHMuZmlsdGVyKHJlcSA9PiAhcGNJZHNUb1JlbW92ZS5pbmNsdWRlcyhyZXEucGNJZCEpKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB3cml0ZURiKCdsYWJyZXF1ZXN0cycsIGFsbFJlcXVlc3RzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIGFsbFBjcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxhYnNbaW5kZXhdID0gbmV3TGFiRGF0YTtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignbGFicycsIGxhYnMpO1xuICAgICAgICByZXR1cm4gbmV3TGFiRGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVMYWJBY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCBsYWJzID0gYXdhaXQgZ2V0TGFic0FjdGlvbigpO1xuICAgIGxhYnMgPSBsYWJzLmZpbHRlcihsID0+IGwuaWQgIT09IGlkKTtcbiAgICBhd2FpdCB3cml0ZURiKCdsYWJzJywgbGFicyk7XG5cbiAgICBsZXQgcGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG4gICAgcGNzID0gcGNzLmZpbHRlcihwYyA9PiBwYy5sYWJJZCAhPT0gaWQpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIHBjcyk7XG59XG5cbi8vIFBDc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBjc0FjdGlvbigpOiBQcm9taXNlPFBjW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdwY3MnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFBjQWN0aW9uKHBjOiBQYykge1xuICAgIGNvbnN0IHBjcyA9IGF3YWl0IGdldFBjc0FjdGlvbigpO1xuICAgIHBjcy5wdXNoKHBjKTtcbiAgICBhd2FpdCB3cml0ZURiKCdwY3MnLCBwY3MpO1xuICAgIHJldHVybiBwYztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBjQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8UGM+KSB7XG4gICAgY29uc3QgcGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG4gICAgY29uc3QgaW5kZXggPSBwY3MuZmluZEluZGV4KHBjID0+IHBjLmlkID09PSBpZCk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBwY3NbaW5kZXhdID0geyAuLi5wY3NbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIHBjcyk7XG4gICAgICAgIHJldHVybiBwY3NbaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLy8gTEFCIFJFUVVFU1RTXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGFiUmVxdWVzdHNBY3Rpb24oKTogUHJvbWlzZTxMYWJSZXF1ZXN0W10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdsYWJyZXF1ZXN0cycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkTGFiUmVxdWVzdEFjdGlvbihyZXF1ZXN0OiBPbWl0PExhYlJlcXVlc3QsICdpZCc+KSB7XG4gICAgY29uc3QgcmVxdWVzdHMgPSBhd2FpdCBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpO1xuICAgIGNvbnN0IG5ld1JlcXVlc3QgPSB7IC4uLnJlcXVlc3QsIGlkOiBgUkVRLSR7RGF0ZS5ub3coKX1gIH07XG4gICAgcmVxdWVzdHMucHVzaChuZXdSZXF1ZXN0KTtcbiAgICBhd2FpdCB3cml0ZURiKCdsYWJyZXF1ZXN0cycsIHJlcXVlc3RzKTtcbiAgICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgICAgIHVzZXJJZDogbmV3UmVxdWVzdC5zdHVkZW50SWQsXG4gICAgICAgIHVzZXJOYW1lOiAnU3R1ZGVudCcsXG4gICAgICAgIGFjdGlvbjogJ0xhYiBSZXF1ZXN0IENyZWF0ZWQnLFxuICAgICAgICBkZXRhaWxzOiBgUmVxdWVzdCBmb3IgTGFiICR7bmV3UmVxdWVzdC5sYWJJZH0gZm9yIHN1YmplY3QgJHtuZXdSZXF1ZXN0LnN1YmplY3RJZH0uYFxuICAgICAgfSk7XG4gICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVMYWJSZXF1ZXN0QWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8TGFiUmVxdWVzdD4pIHtcbiAgY29uc3QgcmVxdWVzdHMgPSBhd2FpdCBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpO1xuICBjb25zdCBpbmRleCA9IHJlcXVlc3RzLmZpbmRJbmRleChyID0+IHIuaWQgPT09IGlkKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHJlcXVlc3RzW2luZGV4XSA9IHsgLi4ucmVxdWVzdHNbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgYXdhaXQgd3JpdGVEYignbGFicmVxdWVzdHMnLCByZXF1ZXN0cyk7XG4gICAgYXdhaXQgYWRkQXVkaXRMb2dBY3Rpb24oe1xuICAgICAgICB1c2VySWQ6IHJlcXVlc3RzW2luZGV4XS50ZWFjaGVySWQsXG4gICAgICAgIHVzZXJOYW1lOiAnVGVhY2hlcicsXG4gICAgICAgIGFjdGlvbjogYExhYiBSZXF1ZXN0ICR7dXBkYXRlcy5zdGF0dXN9YCxcbiAgICAgICAgZGV0YWlsczogYFJlcXVlc3QgJHtpZH0gc3RhdHVzIGNoYW5nZWQgdG8gJHt1cGRhdGVzLnN0YXR1c30uYFxuICAgICAgfSk7XG4gICAgcmV0dXJuIHJlcXVlc3RzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gQVVESVQgTE9HXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXVkaXRMb2dzQWN0aW9uKCk6IFByb21pc2U8QXVkaXRMb2dbXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ2F1ZGl0bG9nJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRBdWRpdExvZ0FjdGlvbihsb2c6IE9taXQ8QXVkaXRMb2csICdpZCcgfCAndGltZXN0YW1wJz4pIHtcbiAgICBjb25zdCBsb2dzID0gYXdhaXQgZ2V0QXVkaXRMb2dzQWN0aW9uKCk7XG4gICAgY29uc3QgbmV3TG9nID0geyBcbiAgICAgICAgLi4ubG9nLCBcbiAgICAgICAgaWQ6IGBMT0ctJHtEYXRlLm5vdygpfWAsIFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSBcbiAgICB9O1xuICAgIGxvZ3MudW5zaGlmdChuZXdMb2cpOyAvLyBBZGQgdG8gdGhlIGJlZ2lubmluZ1xuICAgIGF3YWl0IHdyaXRlRGIoJ2F1ZGl0bG9nJywgbG9ncyk7XG4gICAgcmV0dXJuIG5ld0xvZztcbn1cblxuLy8gU0VUVElOR1NcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5nc0FjdGlvbigpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ3NldHRpbmdzJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpZiBzZXR0aW5ncyBkbyBub3QgZXhpc3QsIGNyZWF0ZSBpdFxuICAgICAgICBjb25zdCBkZWZhdWx0U2V0dGluZ3MgPSB7IHRlYWNoZXJTZWNyZXQ6IFwiY2hhbmdlbWVcIiB9O1xuICAgICAgICBhd2FpdCB3cml0ZURiKCdzZXR0aW5ncycsIGRlZmF1bHRTZXR0aW5ncyk7XG4gICAgICAgIHJldHVybiBkZWZhdWx0U2V0dGluZ3M7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2V0dGluZ3NBY3Rpb24odXBkYXRlczogYW55KSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBnZXRTZXR0aW5nc0FjdGlvbigpO1xuICAgIGNvbnN0IHVwZGF0ZWRTZXR0aW5ncyA9IHsgLi4uc2V0dGluZ3MsIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCdzZXR0aW5ncycsIHVwZGF0ZWRTZXR0aW5ncyk7XG4gICAgcmV0dXJuIHVwZGF0ZWRTZXR0aW5ncztcbn1cblxuLy8gQk9PS1NcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRCb29rc0FjdGlvbigpOiBQcm9taXNlPEJvb2tbXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ2Jvb2tzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRCb29rQWN0aW9uKGJvb2s6IE9taXQ8Qm9vaywgJ2lkJz4pIHtcbiAgICBjb25zdCBib29rcyA9IGF3YWl0IGdldEJvb2tzQWN0aW9uKCk7XG4gICAgY29uc3QgbmV3Qm9vayA9IHsgLi4uYm9vaywgaWQ6IGBCT09LLSR7RGF0ZS5ub3coKX1gfTtcbiAgICBib29rcy5wdXNoKG5ld0Jvb2spO1xuICAgIGF3YWl0IHdyaXRlRGIoJ2Jvb2tzJywgYm9va3MpO1xuICAgIHJldHVybiBuZXdCb29rO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlQm9va0FjdGlvbihpZDogc3RyaW5nLCB1cGRhdGVzOiBQYXJ0aWFsPEJvb2s+KSB7XG4gICAgY29uc3QgYm9va3MgPSBhd2FpdCBnZXRCb29rc0FjdGlvbigpO1xuICAgIGNvbnN0IGluZGV4ID0gYm9va3MuZmluZEluZGV4KGIgPT4gYi5pZCA9PT0gaWQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgYm9va3NbaW5kZXhdID0geyAuLi5ib29rc1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignYm9va3MnLCBib29rcyk7XG4gICAgICAgIHJldHVybiBib29rc1tpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQm9va0FjdGlvbihpZDogc3RyaW5nKSB7XG4gICAgbGV0IGJvb2tzID0gYXdhaXQgZ2V0Qm9va3NBY3Rpb24oKTtcbiAgICBib29rcyA9IGJvb2tzLmZpbHRlcihiID0+IGIuaWQgIT09IGlkKTtcbiAgICBhd2FpdCB3cml0ZURiKCdib29rcycsIGJvb2tzKTtcbn1cblxuLy8gTElCUkFSWSBCT1JST1dJTkdTXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlicmFyeUJvcnJvd2luZ3NBY3Rpb24oKTogUHJvbWlzZTxMaWJyYXJ5Qm9ycm93aW5nW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdsaWJyYXJ5Ym9ycm93aW5ncycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkTGlicmFyeUJvcnJvd2luZ0FjdGlvbihib3Jyb3dpbmc6IE9taXQ8TGlicmFyeUJvcnJvd2luZywgJ2lkJz4pIHtcbiAgICBjb25zdCBib3Jyb3dpbmdzID0gYXdhaXQgZ2V0TGlicmFyeUJvcnJvd2luZ3NBY3Rpb24oKTtcbiAgICBjb25zdCBuZXdCb3Jyb3dpbmcgPSB7IC4uLmJvcnJvd2luZywgaWQ6IGBMQi0ke0RhdGUubm93KCl9YH07XG4gICAgYm9ycm93aW5ncy5wdXNoKG5ld0JvcnJvd2luZyk7XG4gICAgYXdhaXQgd3JpdGVEYignbGlicmFyeWJvcnJvd2luZ3MnLCBib3Jyb3dpbmdzKTtcbiAgICByZXR1cm4gbmV3Qm9ycm93aW5nO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlicmFyeUJvcnJvd2luZ0FjdGlvbihpZDogc3RyaW5nLCB1cGRhdGVzOiBQYXJ0aWFsPExpYnJhcnlCb3Jyb3dpbmc+KSB7XG4gICAgY29uc3QgYm9ycm93aW5ncyA9IGF3YWl0IGdldExpYnJhcnlCb3Jyb3dpbmdzQWN0aW9uKCk7XG4gICAgY29uc3QgaW5kZXggPSBib3Jyb3dpbmdzLmZpbmRJbmRleChiID0+IGIuaWQgPT09IGlkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGJvcnJvd2luZ3NbaW5kZXhdID0geyAuLi5ib3Jyb3dpbmdzW2luZGV4XSwgLi4udXBkYXRlcyB9O1xuICAgICAgICBhd2FpdCB3cml0ZURiKCdsaWJyYXJ5Ym9ycm93aW5ncycsIGJvcnJvd2luZ3MpO1xuICAgICAgICByZXR1cm4gYm9ycm93aW5nc1tpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5cbi8vIEJPUlJPVyBSRVFVRVNUU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEJvcnJvd1JlcXVlc3RzQWN0aW9uKCk6IFByb21pc2U8Qm9ycm93UmVxdWVzdFtdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHJlYWREYignYm9ycm93cmVxdWVzdHMnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZEJvcnJvd1JlcXVlc3RBY3Rpb24ocmVxdWVzdDogT21pdDxCb3Jyb3dSZXF1ZXN0LCAnaWQnPikge1xuICAgIGNvbnN0IHJlcXVlc3RzID0gYXdhaXQgZ2V0Qm9ycm93UmVxdWVzdHNBY3Rpb24oKTtcbiAgICBjb25zdCBuZXdSZXF1ZXN0ID0geyAuLi5yZXF1ZXN0LCBpZDogYEJSLSR7RGF0ZS5ub3coKX1gIH07XG4gICAgcmVxdWVzdHMucHVzaChuZXdSZXF1ZXN0KTtcbiAgICBhd2FpdCB3cml0ZURiKCdib3Jyb3dyZXF1ZXN0cycsIHJlcXVlc3RzKTtcbiAgICByZXR1cm4gbmV3UmVxdWVzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUJvcnJvd1JlcXVlc3RBY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxCb3Jyb3dSZXF1ZXN0Pikge1xuICBjb25zdCByZXF1ZXN0cyA9IGF3YWl0IGdldEJvcnJvd1JlcXVlc3RzQWN0aW9uKCk7XG4gIGNvbnN0IGluZGV4ID0gcmVxdWVzdHMuZmluZEluZGV4KHIgPT4gci5pZCA9PT0gaWQpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgcmVxdWVzdHNbaW5kZXhdID0geyAuLi5yZXF1ZXN0c1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCdib3Jyb3dyZXF1ZXN0cycsIHJlcXVlc3RzKTtcbiAgICByZXR1cm4gcmVxdWVzdHNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5cbi8vIFJFU0VSVkFUSU9OU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFJlc2VydmF0aW9uc0FjdGlvbigpOiBQcm9taXNlPFJlc2VydmF0aW9uW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdyZXNlcnZhdGlvbnMnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFJlc2VydmF0aW9uQWN0aW9uKHJlc2VydmF0aW9uOiBPbWl0PFJlc2VydmF0aW9uLCAnaWQnPikge1xuICAgIGNvbnN0IHJlc2VydmF0aW9ucyA9IGF3YWl0IGdldFJlc2VydmF0aW9uc0FjdGlvbigpO1xuICAgIGNvbnN0IG5ld1Jlc2VydmF0aW9uID0geyAuLi5yZXNlcnZhdGlvbiwgaWQ6IGBSRVMtJHtEYXRlLm5vdygpfWB9O1xuICAgIHJlc2VydmF0aW9ucy5wdXNoKG5ld1Jlc2VydmF0aW9uKTtcbiAgICBhd2FpdCB3cml0ZURiKCdyZXNlcnZhdGlvbnMnLCByZXNlcnZhdGlvbnMpO1xuICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgdXNlcklkOiBuZXdSZXNlcnZhdGlvbi50ZWFjaGVySWQsXG4gICAgICAgIHVzZXJOYW1lOiAnVGVhY2hlcicsXG4gICAgICAgIGFjdGlvbjogJ1Jlc2VydmF0aW9uIENyZWF0ZWQnLFxuICAgICAgICBkZXRhaWxzOiBgUmVzZXJ2ZWQgJHtuZXdSZXNlcnZhdGlvbi5sb2NhdGlvblR5cGV9ICR7bmV3UmVzZXJ2YXRpb24ubG9jYXRpb25JZH0gZm9yIHN1YmplY3QgJHtuZXdSZXNlcnZhdGlvbi5zdWJqZWN0SWR9IG9uICR7bmV3UmVzZXJ2YXRpb24uZGF0ZX0uYFxuICAgICAgfSk7XG4gICAgcmV0dXJuIG5ld1Jlc2VydmF0aW9uO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUmVzZXJ2YXRpb25BY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCByZXNlcnZhdGlvbnMgPSBhd2FpdCBnZXRSZXNlcnZhdGlvbnNBY3Rpb24oKTtcbiAgICBjb25zdCByZXNUb0RlbGV0ZSA9IHJlc2VydmF0aW9ucy5maW5kKHIgPT4gci5pZCA9PT0gaWQpO1xuICAgIGlmKHJlc1RvRGVsZXRlKSB7XG4gICAgICAgIHJlc2VydmF0aW9ucyA9IHJlc2VydmF0aW9ucy5maWx0ZXIociA9PiByLmlkICE9PSBpZCk7XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3Jlc2VydmF0aW9ucycsIHJlc2VydmF0aW9ucyk7XG4gICAgICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgICAgIHVzZXJJZDogcmVzVG9EZWxldGUudGVhY2hlcklkLFxuICAgICAgICAgICAgdXNlck5hbWU6ICdUZWFjaGVyJyxcbiAgICAgICAgICAgIGFjdGlvbjogJ1Jlc2VydmF0aW9uIERlbGV0ZWQnLFxuICAgICAgICAgICAgZGV0YWlsczogYERlbGV0ZWQgcmVzZXJ2YXRpb24gJHtpZH0uYFxuICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoib1NBT3NCIn0=
}),
"[project]/src/app/actions/data:64b2b3 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00232967ca798a5757a07845c638d8e2af30ba68a5":"getSettingsAction"},"src/app/actions/dbActions.ts",""] */ __turbopack_context__.s([
    "getSettingsAction",
    ()=>getSettingsAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var getSettingsAction = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("00232967ca798a5757a07845c638d8e2af30ba68a5", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getSettingsAction"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZGJBY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuJ3VzZSBzZXJ2ZXInO1xuXG5pbXBvcnQgeyByZWFkRGIsIHdyaXRlRGIsIHNhdmVQcm9maWxlSW1hZ2UgfSBmcm9tICdAL2xpYi9kYic7XG5pbXBvcnQgeyBVc2VyLCBTdWJqZWN0LCBFbnJvbGxtZW50LCBBdHRlbmRhbmNlLCBMYWIsIFBjLCBMYWJSZXF1ZXN0LCBBdWRpdExvZywgQm9vaywgTGlicmFyeUJvcnJvd2luZywgUm9vbSwgUmVzZXJ2YXRpb24sIEJvcnJvd1JlcXVlc3QgfSBmcm9tICdAL3V0aWxzL3N0b3JhZ2UnO1xuXG4vLyBVU0VSU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJzQWN0aW9uKCk6IFByb21pc2U8VXNlcltdPiB7XG4gIHJldHVybiBhd2FpdCByZWFkRGIoJ3VzZXJzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyQnlJZEFjdGlvbihpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyIHwgbnVsbD4ge1xuICBjb25zdCB1c2VycyA9IGF3YWl0IGdldFVzZXJzQWN0aW9uKCk7XG4gIHJldHVybiB1c2Vycy5maW5kKHUgPT4gdS5pZCA9PT0gaWQpIHx8IG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRVc2VyQWN0aW9uKHVzZXI6IFVzZXIpIHtcbiAgY29uc3QgdXNlcnMgPSBhd2FpdCByZWFkRGIoJ3VzZXJzJyk7XG4gIHVzZXJzLnB1c2godXNlcik7XG4gIGF3YWl0IHdyaXRlRGIoJ3VzZXJzJywgdXNlcnMpO1xuICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgdXNlcklkOiAnYWRtaW4nLFxuICAgIHVzZXJOYW1lOiAnU3lzdGVtJyxcbiAgICBhY3Rpb246ICdVc2VyIENyZWF0ZWQnLFxuICAgIGRldGFpbHM6IGBVc2VyICR7dXNlci5uYW1lfSAoJHt1c2VyLmlkfSkgd2FzIGNyZWF0ZWQuYFxuICB9KTtcbiAgcmV0dXJuIHVzZXI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVVc2VyQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8VXNlcj4pIHtcbiAgY29uc3QgdXNlcnMgPSBhd2FpdCBnZXRVc2Vyc0FjdGlvbigpO1xuICBjb25zdCBpbmRleCA9IHVzZXJzLmZpbmRJbmRleCh1ID0+IHUuaWQgPT09IGlkKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIGlmICh1cGRhdGVzLnByb2ZpbGVQaWMgJiYgdXBkYXRlcy5wcm9maWxlUGljLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgIGNvbnN0IG5ld1BhdGggPSBhd2FpdCBzYXZlUHJvZmlsZUltYWdlKGlkLCB1cGRhdGVzLnByb2ZpbGVQaWMpO1xuICAgICAgaWYgKG5ld1BhdGgpIHVwZGF0ZXMucHJvZmlsZVBpYyA9IG5ld1BhdGg7XG4gICAgfVxuICAgIFxuICAgIHVzZXJzW2luZGV4XSA9IHsgLi4udXNlcnNbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgYXdhaXQgd3JpdGVEYigndXNlcnMnLCB1c2Vycyk7XG4gICAgYXdhaXQgYWRkQXVkaXRMb2dBY3Rpb24oe1xuICAgICAgdXNlcklkOiBpZCxcbiAgICAgIHVzZXJOYW1lOiB1c2Vyc1tpbmRleF0ubmFtZSxcbiAgICAgIGFjdGlvbjogJ1Byb2ZpbGUgVXBkYXRlZCcsXG4gICAgICBkZXRhaWxzOiBgVXNlciBwcm9maWxlIGZvciAke3VzZXJzW2luZGV4XS5uYW1lfSB3YXMgdXBkYXRlZC5gXG4gICAgfSk7XG4gICAgcmV0dXJuIHVzZXJzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVVzZXJBY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCB1c2VycyA9IGF3YWl0IGdldFVzZXJzQWN0aW9uKCk7XG4gICAgY29uc3QgdXNlclRvRGVsZXRlID0gdXNlcnMuZmluZCh1ID0+IHUuaWQgPT09IGlkKTtcbiAgICBpZih1c2VyVG9EZWxldGUpIHtcbiAgICAgICAgdXNlcnMgPSB1c2Vycy5maWx0ZXIodSA9PiB1LmlkICE9PSBpZCk7XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3VzZXJzJywgdXNlcnMpO1xuICAgICAgICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgICAgICAgICB1c2VySWQ6ICdhZG1pbicsXG4gICAgICAgICAgICB1c2VyTmFtZTogJ1N5c3RlbScsXG4gICAgICAgICAgICBhY3Rpb246ICdVc2VyIERlbGV0ZWQnLFxuICAgICAgICAgICAgZGV0YWlsczogYFVzZXIgJHt1c2VyVG9EZWxldGUubmFtZX0gKCR7aWR9KSB3YXMgZGVsZXRlZC5gXG4gICAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vLyBTVUJKRUNUU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN1YmplY3RzQWN0aW9uKCk6IFByb21pc2U8U3ViamVjdFtdPiB7XG4gIHJldHVybiBhd2FpdCByZWFkRGIoJ3N1YmplY3RzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRTdWJqZWN0QWN0aW9uKHN1YmplY3Q6IFN1YmplY3QpIHtcbiAgY29uc3Qgc3ViamVjdHMgPSBhd2FpdCByZWFkRGIoJ3N1YmplY3RzJyk7XG4gIHN1YmplY3RzLnB1c2goc3ViamVjdCk7XG4gIGF3YWl0IHdyaXRlRGIoJ3N1YmplY3RzJywgc3ViamVjdHMpO1xuICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgdXNlcklkOiBzdWJqZWN0LnRlYWNoZXJJZCxcbiAgICB1c2VyTmFtZTogc3ViamVjdC50ZWFjaGVyTmFtZSxcbiAgICBhY3Rpb246ICdTdWJqZWN0IEFkZGVkJyxcbiAgICBkZXRhaWxzOiBgU3ViamVjdCBcIiR7c3ViamVjdC5uYW1lfVwiIHdhcyBhZGRlZC5gXG4gIH0pO1xuICByZXR1cm4gc3ViamVjdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVN1YmplY3RBY3Rpb24oc3ViamVjdDogU3ViamVjdCkge1xuICAgIGNvbnN0IHN1YmplY3RzID0gYXdhaXQgZ2V0U3ViamVjdHNBY3Rpb24oKTtcbiAgICBjb25zdCBpbmRleCA9IHN1YmplY3RzLmZpbmRJbmRleChzID0+IHMuaWQgPT09IHN1YmplY3QuaWQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgc3ViamVjdHNbaW5kZXhdID0gc3ViamVjdDtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignc3ViamVjdHMnLCBzdWJqZWN0cyk7XG4gICAgICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgICAgIHVzZXJJZDogc3ViamVjdC50ZWFjaGVySWQsXG4gICAgICAgICAgICB1c2VyTmFtZTogc3ViamVjdC50ZWFjaGVyTmFtZSxcbiAgICAgICAgICAgIGFjdGlvbjogJ1N1YmplY3QgVXBkYXRlZCcsXG4gICAgICAgICAgICBkZXRhaWxzOiBgU3ViamVjdCBcIiR7c3ViamVjdC5uYW1lfVwiIHdhcyB1cGRhdGVkLmBcbiAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN1YmplY3RzW2luZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVTdWJqZWN0QWN0aW9uKHN1YmplY3RJZDogc3RyaW5nKSB7XG4gICAgbGV0IHN1YmplY3RzID0gYXdhaXQgZ2V0U3ViamVjdHNBY3Rpb24oKTtcbiAgICBjb25zdCBzdWJqZWN0VG9EZWxldGUgPSBzdWJqZWN0cy5maW5kKHMgPT4gcy5pZCA9PT0gc3ViamVjdElkKTtcbiAgICBpZiAoc3ViamVjdFRvRGVsZXRlKSB7XG4gICAgICAgIHN1YmplY3RzID0gc3ViamVjdHMuZmlsdGVyKHMgPT4gcy5pZCAhPT0gc3ViamVjdElkKTtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignc3ViamVjdHMnLCBzdWJqZWN0cyk7XG4gICAgICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgICAgIHVzZXJJZDogc3ViamVjdFRvRGVsZXRlLnRlYWNoZXJJZCxcbiAgICAgICAgICAgIHVzZXJOYW1lOiBzdWJqZWN0VG9EZWxldGUudGVhY2hlck5hbWUsXG4gICAgICAgICAgICBhY3Rpb246ICdTdWJqZWN0IERlbGV0ZWQnLFxuICAgICAgICAgICAgZGV0YWlsczogYFN1YmplY3QgXCIke3N1YmplY3RUb0RlbGV0ZS5uYW1lfVwiIHdhcyBkZWxldGVkLmBcbiAgICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gRU5ST0xMTUVOVFNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRFbnJvbGxtZW50c0FjdGlvbigpOiBQcm9taXNlPEVucm9sbG1lbnRbXT4ge1xuICByZXR1cm4gYXdhaXQgcmVhZERiKCdlbnJvbGxtZW50cycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkRW5yb2xsbWVudEFjdGlvbihlbnJvbGxtZW50OiBFbnJvbGxtZW50KSB7XG4gIGNvbnN0IGVucm9sbG1lbnRzID0gYXdhaXQgcmVhZERiKCdlbnJvbGxtZW50cycpO1xuICBlbnJvbGxtZW50cy5wdXNoKGVucm9sbG1lbnQpO1xuICBhd2FpdCB3cml0ZURiKCdlbnJvbGxtZW50cycsIGVucm9sbG1lbnRzKTtcbiAgYXdhaXQgYWRkQXVkaXRMb2dBY3Rpb24oe1xuICAgIHVzZXJJZDogZW5yb2xsbWVudC5zdHVkZW50SWQsXG4gICAgdXNlck5hbWU6ICdTdHVkZW50JywgLy8gTmFtZSBub3QgYXZhaWxhYmxlIGhlcmVcbiAgICBhY3Rpb246ICdFbnJvbGxtZW50IFJlcXVlc3QnLFxuICAgIGRldGFpbHM6IGBTdHVkZW50ICR7ZW5yb2xsbWVudC5zdHVkZW50SWR9IHJlcXVlc3RlZCB0byBlbnJvbGwgaW4gc3ViamVjdCAke2Vucm9sbG1lbnQuc3ViamVjdElkfS5gXG4gIH0pO1xuICByZXR1cm4gZW5yb2xsbWVudDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUVucm9sbG1lbnRBY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxFbnJvbGxtZW50Pikge1xuICBjb25zdCBlbnJvbGxtZW50cyA9IGF3YWl0IGdldEVucm9sbG1lbnRzQWN0aW9uKCk7XG4gIGNvbnN0IGluZGV4ID0gZW5yb2xsbWVudHMuZmluZEluZGV4KGUgPT4gZS5pZCA9PT0gaWQpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZW5yb2xsbWVudHNbaW5kZXhdID0geyAuLi5lbnJvbGxtZW50c1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCdlbnJvbGxtZW50cycsIGVucm9sbG1lbnRzKTtcbiAgICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgICAgIHVzZXJJZDogJ3RlYWNoZXInLCAvLyBBc3N1bWUgYSB0ZWFjaGVyIGlzIGRvaW5nIHRoaXNcbiAgICAgICAgdXNlck5hbWU6ICdUZWFjaGVyJyxcbiAgICAgICAgYWN0aW9uOiBgRW5yb2xsbWVudCAke3VwZGF0ZXMuc3RhdHVzfWAsXG4gICAgICAgIGRldGFpbHM6IGBFbnJvbGxtZW50ICR7aWR9IHN0YXR1cyBjaGFuZ2VkIHRvICR7dXBkYXRlcy5zdGF0dXN9LmBcbiAgICAgIH0pO1xuICAgIHJldHVybiBlbnJvbGxtZW50c1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIEFUVEVOREFOQ0VcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBdHRlbmRhbmNlc0FjdGlvbigpOiBQcm9taXNlPEF0dGVuZGFuY2VbXT4ge1xuICByZXR1cm4gYXdhaXQgcmVhZERiKCdhdHRlbmRhbmNlJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRBdHRlbmRhbmNlQWN0aW9uKGF0dGVuZGFuY2U6IE9taXQ8QXR0ZW5kYW5jZSwgJ2lkJz4pIHtcbiAgICBjb25zdCBhdHRlbmRhbmNlcyA9IGF3YWl0IHJlYWREYignYXR0ZW5kYW5jZScpO1xuICAgIGNvbnN0IG5ld0F0dGVuZGFuY2UgPSB7IC4uLmF0dGVuZGFuY2UsIGlkOiBgQVRULSR7RGF0ZS5ub3coKX1gIH07XG4gICAgYXR0ZW5kYW5jZXMucHVzaChuZXdBdHRlbmRhbmNlKTtcbiAgICBhd2FpdCB3cml0ZURiKCdhdHRlbmRhbmNlJywgYXR0ZW5kYW5jZXMpO1xuXG4gICAgLy8gSWYgYSBQQyB3YXMgYXNzaWduZWQsIHVwZGF0ZSBpdHMgc3RhdHVzXG4gICAgaWYgKG5ld0F0dGVuZGFuY2UucGNJZCkge1xuICAgICAgICBhd2FpdCB1cGRhdGVQY0FjdGlvbihuZXdBdHRlbmRhbmNlLnBjSWQsIHsgc3RhdHVzOiAnb2NjdXBpZWQnIH0pO1xuICAgIH1cbiAgICBcbiAgICAvLyBDcmVhdGUgYSBtb3JlIGRldGFpbGVkIGF1ZGl0IGxvZ1xuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgcmVhZERiKCd1c2VycycpO1xuICAgIGNvbnN0IHN0dWRlbnQgPSB1c2Vycy5maW5kKHUgPT4gdS5pZCA9PT0gbmV3QXR0ZW5kYW5jZS5zdHVkZW50SWQpO1xuICAgIGNvbnN0IHN1YmplY3RzID0gYXdhaXQgcmVhZERiKCdzdWJqZWN0cycpO1xuICAgIGNvbnN0IHN1YmplY3QgPSBzdWJqZWN0cy5maW5kKHMgPT4gcy5pZCA9PT0gbmV3QXR0ZW5kYW5jZS5zdWJqZWN0SWQpO1xuXG4gICAgbGV0IGxvY2F0aW9uRGV0YWlscyA9ICcnO1xuICAgIGlmIChuZXdBdHRlbmRhbmNlLmxvY2F0aW9uSWQgJiYgbmV3QXR0ZW5kYW5jZS5sb2NhdGlvblR5cGUpIHtcbiAgICAgICAgaWYgKG5ld0F0dGVuZGFuY2UubG9jYXRpb25UeXBlID09PSAnbGFiJykge1xuICAgICAgICAgICAgY29uc3QgbGFicyA9IGF3YWl0IHJlYWREYignbGFicycpO1xuICAgICAgICAgICAgY29uc3QgbGFiID0gbGFicy5maW5kKGwgPT4gbC5pZCA9PT0gbmV3QXR0ZW5kYW5jZS5sb2NhdGlvbklkKTtcbiAgICAgICAgICAgIGxvY2F0aW9uRGV0YWlscyA9IGAgaW4gJHtsYWI/Lm5hbWUgfHwgJ2xhYid9YDtcbiAgICAgICAgICAgIGlmIChuZXdBdHRlbmRhbmNlLnBjSWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwY051bWJlciA9IG5ld0F0dGVuZGFuY2UucGNJZC5zcGxpdCgnLScpLnBvcCgpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uRGV0YWlscyArPSBgIChQQzogJHtwY051bWJlcn0pYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gcm9vbVxuICAgICAgICAgICAgY29uc3Qgcm9vbXMgPSBhd2FpdCByZWFkRGIoJ3Jvb21zJyk7XG4gICAgICAgICAgICBjb25zdCByb29tID0gcm9vbXMuZmluZChyID0+IHIuaWQgPT09IG5ld0F0dGVuZGFuY2UubG9jYXRpb25JZCk7XG4gICAgICAgICAgICBsb2NhdGlvbkRldGFpbHMgPSBgIGluICR7cm9vbT8ubmFtZSB8fCAncm9vbSd9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgdXNlcklkOiBuZXdBdHRlbmRhbmNlLnN0dWRlbnRJZCxcbiAgICAgICAgdXNlck5hbWU6IHN0dWRlbnQ/Lm5hbWUgfHwgJ1N0dWRlbnQnLFxuICAgICAgICBhY3Rpb246ICdBdHRlbmRhbmNlIE1hcmtlZCcsXG4gICAgICAgIGRldGFpbHM6IGBNYXJrZWQgJHtuZXdBdHRlbmRhbmNlLnN0YXR1c30gZm9yIHN1YmplY3QgJHtzdWJqZWN0Py5uYW1lIHx8IG5ld0F0dGVuZGFuY2Uuc3ViamVjdElkfSR7bG9jYXRpb25EZXRhaWxzfS5gXG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIG5ld0F0dGVuZGFuY2U7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUF0dGVuZGFuY2VBY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxBdHRlbmRhbmNlPikge1xuICBjb25zdCBhdHRlbmRhbmNlcyA9IGF3YWl0IGdldEF0dGVuZGFuY2VzQWN0aW9uKCk7XG4gIGNvbnN0IGluZGV4ID0gYXR0ZW5kYW5jZXMuZmluZEluZGV4KGEgPT4gYS5pZCA9PT0gaWQpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxBdHRlbmRhbmNlID0geyAuLi5hdHRlbmRhbmNlc1tpbmRleF0gfTtcbiAgICBhdHRlbmRhbmNlc1tpbmRleF0gPSB7IC4uLm9yaWdpbmFsQXR0ZW5kYW5jZSwgLi4udXBkYXRlcyB9O1xuICAgIGF3YWl0IHdyaXRlRGIoJ2F0dGVuZGFuY2UnLCBhdHRlbmRhbmNlcyk7XG5cbiAgICAvLyBJZiB0aW1pbmcgb3V0IGFuZCB0aGVyZSB3YXMgYSBwY0lkLCBmcmVlIHVwIHRoZSBQQ1xuICAgIGlmICh1cGRhdGVzLnRpbWVPdXQgJiYgb3JpZ2luYWxBdHRlbmRhbmNlLnBjSWQpIHtcbiAgICAgICAgYXdhaXQgdXBkYXRlUGNBY3Rpb24ob3JpZ2luYWxBdHRlbmRhbmNlLnBjSWQsIHsgc3RhdHVzOiAnYXZhaWxhYmxlJyB9KTtcbiAgICB9XG5cbiAgICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgICAgIHVzZXJJZDogYXR0ZW5kYW5jZXNbaW5kZXhdLnN0dWRlbnRJZCxcbiAgICAgICAgdXNlck5hbWU6ICdTdHVkZW50JywgLy8gTmFtZSBub3QgYXZhaWxhYmxlIGhlcmVcbiAgICAgICAgYWN0aW9uOiAnQXR0ZW5kYW5jZSBVcGRhdGVkJyxcbiAgICAgICAgZGV0YWlsczogYEF0dGVuZGFuY2UgJHtpZH0gdXBkYXRlZC4gVGltZW91dDogJHt1cGRhdGVzLnRpbWVPdXR9YFxuICAgICAgfSk7XG4gICAgcmV0dXJuIGF0dGVuZGFuY2VzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gUk9PTVNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSb29tc0FjdGlvbigpOiBQcm9taXNlPFJvb21bXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ3Jvb21zJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRSb29tQWN0aW9uKHJvb206IFJvb20pIHtcbiAgICBjb25zdCByb29tcyA9IGF3YWl0IGdldFJvb21zQWN0aW9uKCk7XG4gICAgcm9vbXMucHVzaChyb29tKTtcbiAgICBhd2FpdCB3cml0ZURiKCdyb29tcycsIHJvb21zKTtcbiAgICByZXR1cm4gcm9vbTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJvb21BY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxSb29tPikge1xuICAgIGNvbnN0IHJvb21zID0gYXdhaXQgZ2V0Um9vbXNBY3Rpb24oKTtcbiAgICBjb25zdCBpbmRleCA9IHJvb21zLmZpbmRJbmRleChyID0+IHIuaWQgPT09IGlkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHJvb21zW2luZGV4XSA9IHsgLi4ucm9vbXNbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3Jvb21zJywgcm9vbXMpO1xuICAgICAgICByZXR1cm4gcm9vbXNbaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVJvb21BY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCByb29tcyA9IGF3YWl0IGdldFJvb21zQWN0aW9uKCk7XG4gICAgcm9vbXMgPSByb29tcy5maWx0ZXIociA9PiByLmlkICE9PSBpZCk7XG4gICAgYXdhaXQgd3JpdGVEYigncm9vbXMnLCByb29tcyk7XG59XG5cbi8vIExBQlNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMYWJzQWN0aW9uKCk6IFByb21pc2U8TGFiW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdsYWJzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRMYWJBY3Rpb24obGFiOiBMYWIpIHtcbiAgICBjb25zdCBsYWJzID0gYXdhaXQgZ2V0TGFic0FjdGlvbigpO1xuICAgIGxhYnMucHVzaChsYWIpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ2xhYnMnLCBsYWJzKTtcbiAgICBcbiAgICAvLyBBdXRvbWF0aWNhbGx5IGFkZCBQQ3MgYmFzZWQgb24gY2FwYWNpdHlcbiAgICBjb25zdCBwY3MgPSBhd2FpdCBnZXRQY3NBY3Rpb24oKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsYWIuY2FwYWNpdHk7IGkrKykge1xuICAgICAgICBwY3MucHVzaCh7XG4gICAgICAgICAgICBpZDogYFBDLSR7bGFiLmlkfS0ke2l9YCxcbiAgICAgICAgICAgIHBjTnVtYmVyOiBpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBsYWJJZDogbGFiLmlkLFxuICAgICAgICAgICAgc3RhdHVzOiAnYXZhaWxhYmxlJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIHBjcyk7XG5cbiAgICByZXR1cm4gbGFiO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGFiQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8TGFiPikge1xuICAgIGNvbnN0IGxhYnMgPSBhd2FpdCBnZXRMYWJzQWN0aW9uKCk7XG4gICAgY29uc3QgaW5kZXggPSBsYWJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IGlkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IG9sZExhYiA9IHsgLi4ubGFic1tpbmRleF0gfTtcbiAgICAgICAgY29uc3QgbmV3TGFiRGF0YSA9IHsgLi4ubGFic1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcblxuICAgICAgICAvLyBJZiBjYXBhY2l0eSBoYXMgY2hhbmdlZCwgdXBkYXRlIFBDc1xuICAgICAgICBpZiAodXBkYXRlcy5jYXBhY2l0eSAhPT0gdW5kZWZpbmVkICYmIHVwZGF0ZXMuY2FwYWNpdHkgIT09IG9sZExhYi5jYXBhY2l0eSkge1xuICAgICAgICAgICAgY29uc3QgbmV3Q2FwYWNpdHkgPSB1cGRhdGVzLmNhcGFjaXR5O1xuICAgICAgICAgICAgY29uc3Qgb2xkQ2FwYWNpdHkgPSBvbGRMYWIuY2FwYWNpdHk7XG4gICAgICAgICAgICBsZXQgYWxsUGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmIChuZXdDYXBhY2l0eSA+IG9sZENhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIG5ldyBQQ3NcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHkgKyAxOyBpIDw9IG5ld0NhcGFjaXR5OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsUGNzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGBQQy0ke2lkfS0ke2l9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBjTnVtYmVyOiBpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJJZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdhdmFpbGFibGUnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBuZXdDYXBhY2l0eSA8IG9sZENhcGFjaXR5XG4gICAgICAgICAgICAgICAgY29uc3QgcGNzRm9yVGhpc0xhYiA9IGFsbFBjcy5maWx0ZXIocGMgPT4gcGMubGFiSWQgPT09IGlkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwY051bWJlcnNUb1JlbW92ZSA9IHBjc0ZvclRoaXNMYWJcbiAgICAgICAgICAgICAgICAgICAgLm1hcChwYyA9PiBwYXJzZUludChwYy5wY051bWJlcikpXG4gICAgICAgICAgICAgICAgICAgIC5zb3J0KChhLGIpID0+IGItYSkgLy8gc29ydCBkZXNjZW5kaW5nXG4gICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCBvbGRDYXBhY2l0eSAtIG5ld0NhcGFjaXR5KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBwY0lkc1RvUmVtb3ZlID0gcGNzRm9yVGhpc0xhYlxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHBjID0+IHBjTnVtYmVyc1RvUmVtb3ZlLmluY2x1ZGVzKHBhcnNlSW50KHBjLnBjTnVtYmVyKSkpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAocGMgPT4gcGMuaWQpO1xuXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0aGUgUENzIHRvIHJlbW92ZVxuICAgICAgICAgICAgICAgIGFsbFBjcyA9IGFsbFBjcy5maWx0ZXIocGMgPT4gIXBjSWRzVG9SZW1vdmUuaW5jbHVkZXMocGMuaWQpKTtcblxuICAgICAgICAgICAgICAgIC8vIEFsc28gcmVtb3ZlIGFueSBwZW5kaW5nL2FwcHJvdmVkIHJlcXVlc3RzIGZvciB0aGVzZSBQQ3NcbiAgICAgICAgICAgICAgICBsZXQgYWxsUmVxdWVzdHMgPSBhd2FpdCBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpO1xuICAgICAgICAgICAgICAgIGFsbFJlcXVlc3RzID0gYWxsUmVxdWVzdHMuZmlsdGVyKHJlcSA9PiAhcGNJZHNUb1JlbW92ZS5pbmNsdWRlcyhyZXEucGNJZCEpKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB3cml0ZURiKCdsYWJyZXF1ZXN0cycsIGFsbFJlcXVlc3RzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIGFsbFBjcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxhYnNbaW5kZXhdID0gbmV3TGFiRGF0YTtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignbGFicycsIGxhYnMpO1xuICAgICAgICByZXR1cm4gbmV3TGFiRGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVMYWJBY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCBsYWJzID0gYXdhaXQgZ2V0TGFic0FjdGlvbigpO1xuICAgIGxhYnMgPSBsYWJzLmZpbHRlcihsID0+IGwuaWQgIT09IGlkKTtcbiAgICBhd2FpdCB3cml0ZURiKCdsYWJzJywgbGFicyk7XG5cbiAgICBsZXQgcGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG4gICAgcGNzID0gcGNzLmZpbHRlcihwYyA9PiBwYy5sYWJJZCAhPT0gaWQpO1xuICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIHBjcyk7XG59XG5cbi8vIFBDc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBjc0FjdGlvbigpOiBQcm9taXNlPFBjW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdwY3MnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFBjQWN0aW9uKHBjOiBQYykge1xuICAgIGNvbnN0IHBjcyA9IGF3YWl0IGdldFBjc0FjdGlvbigpO1xuICAgIHBjcy5wdXNoKHBjKTtcbiAgICBhd2FpdCB3cml0ZURiKCdwY3MnLCBwY3MpO1xuICAgIHJldHVybiBwYztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBjQWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8UGM+KSB7XG4gICAgY29uc3QgcGNzID0gYXdhaXQgZ2V0UGNzQWN0aW9uKCk7XG4gICAgY29uc3QgaW5kZXggPSBwY3MuZmluZEluZGV4KHBjID0+IHBjLmlkID09PSBpZCk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBwY3NbaW5kZXhdID0geyAuLi5wY3NbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3BjcycsIHBjcyk7XG4gICAgICAgIHJldHVybiBwY3NbaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuLy8gTEFCIFJFUVVFU1RTXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGFiUmVxdWVzdHNBY3Rpb24oKTogUHJvbWlzZTxMYWJSZXF1ZXN0W10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdsYWJyZXF1ZXN0cycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkTGFiUmVxdWVzdEFjdGlvbihyZXF1ZXN0OiBPbWl0PExhYlJlcXVlc3QsICdpZCc+KSB7XG4gICAgY29uc3QgcmVxdWVzdHMgPSBhd2FpdCBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpO1xuICAgIGNvbnN0IG5ld1JlcXVlc3QgPSB7IC4uLnJlcXVlc3QsIGlkOiBgUkVRLSR7RGF0ZS5ub3coKX1gIH07XG4gICAgcmVxdWVzdHMucHVzaChuZXdSZXF1ZXN0KTtcbiAgICBhd2FpdCB3cml0ZURiKCdsYWJyZXF1ZXN0cycsIHJlcXVlc3RzKTtcbiAgICBhd2FpdCBhZGRBdWRpdExvZ0FjdGlvbih7XG4gICAgICAgIHVzZXJJZDogbmV3UmVxdWVzdC5zdHVkZW50SWQsXG4gICAgICAgIHVzZXJOYW1lOiAnU3R1ZGVudCcsXG4gICAgICAgIGFjdGlvbjogJ0xhYiBSZXF1ZXN0IENyZWF0ZWQnLFxuICAgICAgICBkZXRhaWxzOiBgUmVxdWVzdCBmb3IgTGFiICR7bmV3UmVxdWVzdC5sYWJJZH0gZm9yIHN1YmplY3QgJHtuZXdSZXF1ZXN0LnN1YmplY3RJZH0uYFxuICAgICAgfSk7XG4gICAgcmV0dXJuIG5ld1JlcXVlc3Q7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVMYWJSZXF1ZXN0QWN0aW9uKGlkOiBzdHJpbmcsIHVwZGF0ZXM6IFBhcnRpYWw8TGFiUmVxdWVzdD4pIHtcbiAgY29uc3QgcmVxdWVzdHMgPSBhd2FpdCBnZXRMYWJSZXF1ZXN0c0FjdGlvbigpO1xuICBjb25zdCBpbmRleCA9IHJlcXVlc3RzLmZpbmRJbmRleChyID0+IHIuaWQgPT09IGlkKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHJlcXVlc3RzW2luZGV4XSA9IHsgLi4ucmVxdWVzdHNbaW5kZXhdLCAuLi51cGRhdGVzIH07XG4gICAgYXdhaXQgd3JpdGVEYignbGFicmVxdWVzdHMnLCByZXF1ZXN0cyk7XG4gICAgYXdhaXQgYWRkQXVkaXRMb2dBY3Rpb24oe1xuICAgICAgICB1c2VySWQ6IHJlcXVlc3RzW2luZGV4XS50ZWFjaGVySWQsXG4gICAgICAgIHVzZXJOYW1lOiAnVGVhY2hlcicsXG4gICAgICAgIGFjdGlvbjogYExhYiBSZXF1ZXN0ICR7dXBkYXRlcy5zdGF0dXN9YCxcbiAgICAgICAgZGV0YWlsczogYFJlcXVlc3QgJHtpZH0gc3RhdHVzIGNoYW5nZWQgdG8gJHt1cGRhdGVzLnN0YXR1c30uYFxuICAgICAgfSk7XG4gICAgcmV0dXJuIHJlcXVlc3RzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gQVVESVQgTE9HXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXVkaXRMb2dzQWN0aW9uKCk6IFByb21pc2U8QXVkaXRMb2dbXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ2F1ZGl0bG9nJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRBdWRpdExvZ0FjdGlvbihsb2c6IE9taXQ8QXVkaXRMb2csICdpZCcgfCAndGltZXN0YW1wJz4pIHtcbiAgICBjb25zdCBsb2dzID0gYXdhaXQgZ2V0QXVkaXRMb2dzQWN0aW9uKCk7XG4gICAgY29uc3QgbmV3TG9nID0geyBcbiAgICAgICAgLi4ubG9nLCBcbiAgICAgICAgaWQ6IGBMT0ctJHtEYXRlLm5vdygpfWAsIFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSBcbiAgICB9O1xuICAgIGxvZ3MudW5zaGlmdChuZXdMb2cpOyAvLyBBZGQgdG8gdGhlIGJlZ2lubmluZ1xuICAgIGF3YWl0IHdyaXRlRGIoJ2F1ZGl0bG9nJywgbG9ncyk7XG4gICAgcmV0dXJuIG5ld0xvZztcbn1cblxuLy8gU0VUVElOR1NcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5nc0FjdGlvbigpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ3NldHRpbmdzJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpZiBzZXR0aW5ncyBkbyBub3QgZXhpc3QsIGNyZWF0ZSBpdFxuICAgICAgICBjb25zdCBkZWZhdWx0U2V0dGluZ3MgPSB7IHRlYWNoZXJTZWNyZXQ6IFwiY2hhbmdlbWVcIiB9O1xuICAgICAgICBhd2FpdCB3cml0ZURiKCdzZXR0aW5ncycsIGRlZmF1bHRTZXR0aW5ncyk7XG4gICAgICAgIHJldHVybiBkZWZhdWx0U2V0dGluZ3M7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2V0dGluZ3NBY3Rpb24odXBkYXRlczogYW55KSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBnZXRTZXR0aW5nc0FjdGlvbigpO1xuICAgIGNvbnN0IHVwZGF0ZWRTZXR0aW5ncyA9IHsgLi4uc2V0dGluZ3MsIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCdzZXR0aW5ncycsIHVwZGF0ZWRTZXR0aW5ncyk7XG4gICAgcmV0dXJuIHVwZGF0ZWRTZXR0aW5ncztcbn1cblxuLy8gQk9PS1NcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRCb29rc0FjdGlvbigpOiBQcm9taXNlPEJvb2tbXT4ge1xuICAgIHJldHVybiBhd2FpdCByZWFkRGIoJ2Jvb2tzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRCb29rQWN0aW9uKGJvb2s6IE9taXQ8Qm9vaywgJ2lkJz4pIHtcbiAgICBjb25zdCBib29rcyA9IGF3YWl0IGdldEJvb2tzQWN0aW9uKCk7XG4gICAgY29uc3QgbmV3Qm9vayA9IHsgLi4uYm9vaywgaWQ6IGBCT09LLSR7RGF0ZS5ub3coKX1gfTtcbiAgICBib29rcy5wdXNoKG5ld0Jvb2spO1xuICAgIGF3YWl0IHdyaXRlRGIoJ2Jvb2tzJywgYm9va3MpO1xuICAgIHJldHVybiBuZXdCb29rO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlQm9va0FjdGlvbihpZDogc3RyaW5nLCB1cGRhdGVzOiBQYXJ0aWFsPEJvb2s+KSB7XG4gICAgY29uc3QgYm9va3MgPSBhd2FpdCBnZXRCb29rc0FjdGlvbigpO1xuICAgIGNvbnN0IGluZGV4ID0gYm9va3MuZmluZEluZGV4KGIgPT4gYi5pZCA9PT0gaWQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgYm9va3NbaW5kZXhdID0geyAuLi5ib29rc1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcbiAgICAgICAgYXdhaXQgd3JpdGVEYignYm9va3MnLCBib29rcyk7XG4gICAgICAgIHJldHVybiBib29rc1tpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQm9va0FjdGlvbihpZDogc3RyaW5nKSB7XG4gICAgbGV0IGJvb2tzID0gYXdhaXQgZ2V0Qm9va3NBY3Rpb24oKTtcbiAgICBib29rcyA9IGJvb2tzLmZpbHRlcihiID0+IGIuaWQgIT09IGlkKTtcbiAgICBhd2FpdCB3cml0ZURiKCdib29rcycsIGJvb2tzKTtcbn1cblxuLy8gTElCUkFSWSBCT1JST1dJTkdTXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlicmFyeUJvcnJvd2luZ3NBY3Rpb24oKTogUHJvbWlzZTxMaWJyYXJ5Qm9ycm93aW5nW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdsaWJyYXJ5Ym9ycm93aW5ncycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkTGlicmFyeUJvcnJvd2luZ0FjdGlvbihib3Jyb3dpbmc6IE9taXQ8TGlicmFyeUJvcnJvd2luZywgJ2lkJz4pIHtcbiAgICBjb25zdCBib3Jyb3dpbmdzID0gYXdhaXQgZ2V0TGlicmFyeUJvcnJvd2luZ3NBY3Rpb24oKTtcbiAgICBjb25zdCBuZXdCb3Jyb3dpbmcgPSB7IC4uLmJvcnJvd2luZywgaWQ6IGBMQi0ke0RhdGUubm93KCl9YH07XG4gICAgYm9ycm93aW5ncy5wdXNoKG5ld0JvcnJvd2luZyk7XG4gICAgYXdhaXQgd3JpdGVEYignbGlicmFyeWJvcnJvd2luZ3MnLCBib3Jyb3dpbmdzKTtcbiAgICByZXR1cm4gbmV3Qm9ycm93aW5nO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGlicmFyeUJvcnJvd2luZ0FjdGlvbihpZDogc3RyaW5nLCB1cGRhdGVzOiBQYXJ0aWFsPExpYnJhcnlCb3Jyb3dpbmc+KSB7XG4gICAgY29uc3QgYm9ycm93aW5ncyA9IGF3YWl0IGdldExpYnJhcnlCb3Jyb3dpbmdzQWN0aW9uKCk7XG4gICAgY29uc3QgaW5kZXggPSBib3Jyb3dpbmdzLmZpbmRJbmRleChiID0+IGIuaWQgPT09IGlkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGJvcnJvd2luZ3NbaW5kZXhdID0geyAuLi5ib3Jyb3dpbmdzW2luZGV4XSwgLi4udXBkYXRlcyB9O1xuICAgICAgICBhd2FpdCB3cml0ZURiKCdsaWJyYXJ5Ym9ycm93aW5ncycsIGJvcnJvd2luZ3MpO1xuICAgICAgICByZXR1cm4gYm9ycm93aW5nc1tpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5cbi8vIEJPUlJPVyBSRVFVRVNUU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEJvcnJvd1JlcXVlc3RzQWN0aW9uKCk6IFByb21pc2U8Qm9ycm93UmVxdWVzdFtdPiB7XG4gICAgcmV0dXJuIGF3YWl0IHJlYWREYignYm9ycm93cmVxdWVzdHMnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZEJvcnJvd1JlcXVlc3RBY3Rpb24ocmVxdWVzdDogT21pdDxCb3Jyb3dSZXF1ZXN0LCAnaWQnPikge1xuICAgIGNvbnN0IHJlcXVlc3RzID0gYXdhaXQgZ2V0Qm9ycm93UmVxdWVzdHNBY3Rpb24oKTtcbiAgICBjb25zdCBuZXdSZXF1ZXN0ID0geyAuLi5yZXF1ZXN0LCBpZDogYEJSLSR7RGF0ZS5ub3coKX1gIH07XG4gICAgcmVxdWVzdHMucHVzaChuZXdSZXF1ZXN0KTtcbiAgICBhd2FpdCB3cml0ZURiKCdib3Jyb3dyZXF1ZXN0cycsIHJlcXVlc3RzKTtcbiAgICByZXR1cm4gbmV3UmVxdWVzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUJvcnJvd1JlcXVlc3RBY3Rpb24oaWQ6IHN0cmluZywgdXBkYXRlczogUGFydGlhbDxCb3Jyb3dSZXF1ZXN0Pikge1xuICBjb25zdCByZXF1ZXN0cyA9IGF3YWl0IGdldEJvcnJvd1JlcXVlc3RzQWN0aW9uKCk7XG4gIGNvbnN0IGluZGV4ID0gcmVxdWVzdHMuZmluZEluZGV4KHIgPT4gci5pZCA9PT0gaWQpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgcmVxdWVzdHNbaW5kZXhdID0geyAuLi5yZXF1ZXN0c1tpbmRleF0sIC4uLnVwZGF0ZXMgfTtcbiAgICBhd2FpdCB3cml0ZURiKCdib3Jyb3dyZXF1ZXN0cycsIHJlcXVlc3RzKTtcbiAgICByZXR1cm4gcmVxdWVzdHNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5cbi8vIFJFU0VSVkFUSU9OU1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFJlc2VydmF0aW9uc0FjdGlvbigpOiBQcm9taXNlPFJlc2VydmF0aW9uW10+IHtcbiAgICByZXR1cm4gYXdhaXQgcmVhZERiKCdyZXNlcnZhdGlvbnMnKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFJlc2VydmF0aW9uQWN0aW9uKHJlc2VydmF0aW9uOiBPbWl0PFJlc2VydmF0aW9uLCAnaWQnPikge1xuICAgIGNvbnN0IHJlc2VydmF0aW9ucyA9IGF3YWl0IGdldFJlc2VydmF0aW9uc0FjdGlvbigpO1xuICAgIGNvbnN0IG5ld1Jlc2VydmF0aW9uID0geyAuLi5yZXNlcnZhdGlvbiwgaWQ6IGBSRVMtJHtEYXRlLm5vdygpfWB9O1xuICAgIHJlc2VydmF0aW9ucy5wdXNoKG5ld1Jlc2VydmF0aW9uKTtcbiAgICBhd2FpdCB3cml0ZURiKCdyZXNlcnZhdGlvbnMnLCByZXNlcnZhdGlvbnMpO1xuICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgdXNlcklkOiBuZXdSZXNlcnZhdGlvbi50ZWFjaGVySWQsXG4gICAgICAgIHVzZXJOYW1lOiAnVGVhY2hlcicsXG4gICAgICAgIGFjdGlvbjogJ1Jlc2VydmF0aW9uIENyZWF0ZWQnLFxuICAgICAgICBkZXRhaWxzOiBgUmVzZXJ2ZWQgJHtuZXdSZXNlcnZhdGlvbi5sb2NhdGlvblR5cGV9ICR7bmV3UmVzZXJ2YXRpb24ubG9jYXRpb25JZH0gZm9yIHN1YmplY3QgJHtuZXdSZXNlcnZhdGlvbi5zdWJqZWN0SWR9IG9uICR7bmV3UmVzZXJ2YXRpb24uZGF0ZX0uYFxuICAgICAgfSk7XG4gICAgcmV0dXJuIG5ld1Jlc2VydmF0aW9uO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUmVzZXJ2YXRpb25BY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGxldCByZXNlcnZhdGlvbnMgPSBhd2FpdCBnZXRSZXNlcnZhdGlvbnNBY3Rpb24oKTtcbiAgICBjb25zdCByZXNUb0RlbGV0ZSA9IHJlc2VydmF0aW9ucy5maW5kKHIgPT4gci5pZCA9PT0gaWQpO1xuICAgIGlmKHJlc1RvRGVsZXRlKSB7XG4gICAgICAgIHJlc2VydmF0aW9ucyA9IHJlc2VydmF0aW9ucy5maWx0ZXIociA9PiByLmlkICE9PSBpZCk7XG4gICAgICAgIGF3YWl0IHdyaXRlRGIoJ3Jlc2VydmF0aW9ucycsIHJlc2VydmF0aW9ucyk7XG4gICAgICAgIGF3YWl0IGFkZEF1ZGl0TG9nQWN0aW9uKHtcbiAgICAgICAgICAgIHVzZXJJZDogcmVzVG9EZWxldGUudGVhY2hlcklkLFxuICAgICAgICAgICAgdXNlck5hbWU6ICdUZWFjaGVyJyxcbiAgICAgICAgICAgIGFjdGlvbjogJ1Jlc2VydmF0aW9uIERlbGV0ZWQnLFxuICAgICAgICAgICAgZGV0YWlsczogYERlbGV0ZWQgcmVzZXJ2YXRpb24gJHtpZH0uYFxuICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoidVNBbWFzQiJ9
}),
"[project]/src/app/register/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$fc4bdc__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:fc4bdc [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$61d1ce__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:61d1ce [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$64b2b3__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:64b2b3 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-ssr] (ecmascript) <export default as UserPlus>");
'use client';
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
function RegisterPage() {
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        id: '',
        name: '',
        email: '',
        password: '',
        role: 'student',
        program: '',
        year: 1,
        teacherSecret: ''
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$61d1ce__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getUsersAction"])();
            if (users.some((u)=>u.id === formData.id)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('User with this ID already exists.');
                setLoading(false);
                return;
            }
            if (formData.role === 'teacher') {
                const settings = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$64b2b3__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getSettingsAction"])();
                if (formData.teacherSecret !== settings.teacherSecret) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Invalid teacher secret code.');
                    setLoading(false);
                    return;
                }
            }
            const newUser = {
                id: formData.id,
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                program: formData.role === 'student' ? formData.program : undefined,
                year: formData.role === 'student' ? formData.year : undefined,
                profilePic: ''
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$fc4bdc__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["addUserAction"])(newUser);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Registration successful! Please log in.');
            router.push('/');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('An error occurred during registration.');
        }
        setLoading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-muted/30 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-primary shadow-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-6 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "/logo.png",
                            alt: "AMA Student Portal",
                            width: 150,
                            height: 40
                        }, void 0, false, {
                            fileName: "[project]/src/app/register/page.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/register/page.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/register/page.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/register/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-grow flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full md:w-2/5 bg-primary text-white p-12 flex flex-col justify-center items-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-bold mb-4",
                                    children: "CREATE ACCOUNT"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/80 leading-relaxed",
                                    children: "Join our community and get access to all the portal features."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/register/page.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full md:w-3/5 p-12 overflow-y-auto",
                            style: {
                                maxHeight: '80vh'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold mb-2",
                                    children: "Registration"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground mb-8",
                                    children: "Please fill in the details to sign up"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleSubmit,
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "role",
                                                    children: "I am a"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: formData.role,
                                                    onValueChange: (value)=>setFormData({
                                                            ...formData,
                                                            role: value
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            className: "h-12 rounded-lg",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                fileName: "[project]/src/app/register/page.tsx",
                                                                lineNumber: 101,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/register/page.tsx",
                                                            lineNumber: 100,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "student",
                                                                    children: "Student"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/register/page.tsx",
                                                                    lineNumber: 104,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "teacher",
                                                                    children: "Teacher"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/register/page.tsx",
                                                                    lineNumber: 105,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/register/page.tsx",
                                                            lineNumber: 103,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/register/page.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "id",
                                                    children: formData.role === 'student' ? 'USN' : 'EMP ID'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: "id",
                                                    value: formData.id,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            id: e.target.value
                                                        }),
                                                    required: true,
                                                    className: "h-12 rounded-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/register/page.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "name",
                                                    children: "Full Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: "name",
                                                    value: formData.name,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            name: e.target.value
                                                        }),
                                                    required: true,
                                                    className: "h-12 rounded-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/register/page.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "email",
                                                    children: "Email"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: "email",
                                                    type: "email",
                                                    value: formData.email,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            email: e.target.value
                                                        }),
                                                    required: true,
                                                    className: "h-12 rounded-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/register/page.tsx",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "password",
                                                    children: "Password"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: "password",
                                                    type: "password",
                                                    value: formData.password,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            password: e.target.value
                                                        }),
                                                    required: true,
                                                    className: "h-12 rounded-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/register/page.tsx",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, this),
                                        formData.role === 'student' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                            htmlFor: "program",
                                                            children: "Program"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/register/page.tsx",
                                                            lineNumber: 133,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            id: "program",
                                                            value: formData.program,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    program: e.target.value
                                                                }),
                                                            placeholder: "e.g. BSCS",
                                                            required: true,
                                                            className: "h-12 rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/register/page.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                            htmlFor: "year",
                                                            children: "Year Level"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/register/page.tsx",
                                                            lineNumber: 137,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                            value: String(formData.year),
                                                            onValueChange: (v)=>setFormData({
                                                                    ...formData,
                                                                    year: Number(v)
                                                                }),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                    className: "h-12 rounded-lg",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                        fileName: "[project]/src/app/register/page.tsx",
                                                                        lineNumber: 140,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/register/page.tsx",
                                                                    lineNumber: 139,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                            value: "1",
                                                                            children: "1st Year"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/register/page.tsx",
                                                                            lineNumber: 143,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                            value: "2",
                                                                            children: "2nd Year"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/register/page.tsx",
                                                                            lineNumber: 144,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                            value: "3",
                                                                            children: "3rd Year"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/register/page.tsx",
                                                                            lineNumber: 145,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                            value: "4",
                                                                            children: "4th Year"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/register/page.tsx",
                                                                            lineNumber: 146,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/register/page.tsx",
                                                                    lineNumber: 142,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/register/page.tsx",
                                                            lineNumber: 138,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/register/page.tsx",
                                            lineNumber: 131,
                                            columnNumber: 17
                                        }, this),
                                        formData.role === 'teacher' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "teacherSecret",
                                                    children: "Teacher Secret Code"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: "teacherSecret",
                                                    type: "password",
                                                    value: formData.teacherSecret,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            teacherSecret: e.target.value
                                                        }),
                                                    required: true,
                                                    className: "h-12 rounded-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/register/page.tsx",
                                            lineNumber: 154,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "submit",
                                            className: "w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-lg gap-2",
                                            disabled: loading,
                                            children: [
                                                loading ? 'Registering...' : 'Sign Up',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/register/page.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/register/page.tsx",
                                            lineNumber: 160,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mt-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: [
                                            "Already have an account?",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/",
                                                className: "font-bold text-primary hover:underline",
                                                children: "Sign In"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/register/page.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/register/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/register/page.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/register/page.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/register/page.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/register/page.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/register/page.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__084ab7c4._.js.map