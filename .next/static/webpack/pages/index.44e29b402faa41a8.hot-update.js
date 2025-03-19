"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/utils/transactions.ts":
/*!***********************************!*\
  !*** ./src/utils/transactions.ts ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatWalletAddress: function() { return /* binding */ formatWalletAddress; },\n/* harmony export */   getWalletConnectionInstructions: function() { return /* binding */ getWalletConnectionInstructions; },\n/* harmony export */   isPetraWalletAvailable: function() { return /* binding */ isPetraWalletAvailable; },\n/* harmony export */   transferToEscrow: function() { return /* binding */ transferToEscrow; }\n/* harmony export */ });\n/* harmony import */ var aptos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aptos */ \"./node_modules/aptos/dist/index.mjs\");\n\n// Initialize the Aptos client\nconst client = new aptos__WEBPACK_IMPORTED_MODULE_0__.AptosClient(\"https://fullnode.testnet.aptoslabs.com/v1\");\n// Helper function to transfer funds from a player to the escrow\nasync function transferToEscrow(playerNumber, amount, targetAddress) {\n    let useSimulationMode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;\n    console.log(\"Transferring \".concat(amount, \" APT from Player \").concat(playerNumber, \" to \").concat(targetAddress));\n    // For testing only - simulation mode doesn't do actual transfers\n    if (useSimulationMode) {\n        console.log(\"Using simulation mode for escrow transfer (no actual funds will be moved)\");\n        await new Promise((resolve)=>setTimeout(resolve, 1000)); // Mock transaction delay\n        return true;\n    }\n    // Validate target address\n    if (!targetAddress || targetAddress.trim() === \"\") {\n        console.error(\"Invalid target address:\", targetAddress);\n        throw new Error(\"Invalid recipient address. Unable to process transfer.\");\n    }\n    // Convert amount to octas\n    const amountInOctas = Math.floor(amount * 100000000).toString();\n    console.log(\"Amount in Octas: \".concat(amountInOctas));\n    // Create payload\n    const payload = {\n        type: \"entry_function_payload\",\n        function: \"0x1::coin::transfer\",\n        type_arguments: [\n            \"0x1::aptos_coin::AptosCoin\"\n        ],\n        arguments: [\n            targetAddress,\n            amountInOctas\n        ]\n    };\n    console.log(\"Transaction payload created:\", JSON.stringify(payload));\n    // Submit the transaction - try direct method first\n    try {\n        let txHash = \"\";\n        // Try direct Petra method first\n        if (window.aptos && typeof window.aptos.signAndSubmitTransaction === \"function\") {\n            console.log(\"Using direct Petra wallet for transaction\");\n            try {\n                // Force focus on current window to help popup appear\n                window.focus();\n                const response = await window.aptos.signAndSubmitTransaction(payload);\n                console.log(\"Direct transaction response:\", response);\n                if (response && response.hash) {\n                    txHash = response.hash;\n                    console.log(\"Transaction hash received:\", txHash);\n                } else {\n                    console.error(\"Direct transaction response missing hash:\", response);\n                }\n            } catch (directError) {\n                console.error(\"Direct transaction error:\", directError);\n                if (directError.message) {\n                    throw new Error(\"Transaction failed: \".concat(directError.message));\n                }\n            }\n        }\n        // If we still don't have a hash, the transaction failed\n        if (!txHash) {\n            throw new Error(\"Transaction failed. Make sure your wallet is unlocked and has sufficient funds.\");\n        }\n        // Wait for transaction confirmation\n        console.log(\"Transaction submitted with hash: \".concat(txHash));\n        try {\n            console.log(\"Waiting for transaction confirmation...\");\n            const txResult = await client.waitForTransactionWithResult(txHash);\n            console.log(\"Transfer for Player \".concat(playerNumber, \" confirmed:\"), txResult);\n            return true;\n        } catch (confirmError) {\n            console.warn(\"Error confirming transaction:\", confirmError);\n            // Transaction might still go through, so we'll consider this a success\n            console.log(\"Continuing despite confirmation error (transaction may still be processing)\");\n            return true;\n        }\n    } catch (txError) {\n        console.error(\"Error in transfer for Player \".concat(playerNumber, \":\"), txError);\n        if (txError.message) {\n            throw new Error(\"Failed to transfer funds: \".concat(txError.message));\n        } else {\n            throw new Error(\"Failed to transfer funds. Please check your wallet and try again.\");\n        }\n    }\n}\n// Function to check if Petra wallet is installed and available\nfunction isPetraWalletAvailable() {\n    return  true && typeof window.aptos !== \"undefined\" && typeof window.aptos.connect === \"function\";\n}\n// Helper function to format wallet address for display\nfunction formatWalletAddress(address) {\n    if (!address) return \"\";\n    if (address.length < 10) return address;\n    return \"\".concat(address.substring(0, 6), \"...\").concat(address.substring(address.length - 4));\n}\n// Helper function to get instructions based on player number\nfunction getWalletConnectionInstructions(playerNumber) {\n    if (playerNumber === 1) {\n        return \"Connect your Player 1 wallet by clicking the button below.\";\n    } else {\n        return \"Connect Player 2's wallet:\";\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUwsT0FBTyxFQUFFO1lBQ25CLE1BQU0sSUFBSXBCLE1BQU0sNkJBQTZDLE9BQWhCeUIsUUFBUUwsT0FBTztRQUM5RCxPQUFPO1lBQ0wsTUFBTSxJQUFJcEIsTUFBTTtRQUNsQjtJQUNGO0FBQ0Y7QUFFQSwrREFBK0Q7QUFDeEQsU0FBUzBCO0lBQ2QsT0FBTyxLQUFrQixJQUNsQixPQUFPYixPQUFPQyxLQUFLLEtBQUssZUFDeEIsT0FBT0QsT0FBT0MsS0FBSyxDQUFDYSxPQUFPLEtBQUs7QUFDekM7QUFFQSx1REFBdUQ7QUFDaEQsU0FBU0Msb0JBQW9CQyxPQUFlO0lBQ2pELElBQUksQ0FBQ0EsU0FBUyxPQUFPO0lBRXJCLElBQUlBLFFBQVFDLE1BQU0sR0FBRyxJQUFJLE9BQU9EO0lBRWhDLE9BQU8sR0FBZ0NBLE9BQTdCQSxRQUFRRSxTQUFTLENBQUMsR0FBRyxJQUFHLE9BQTJDLE9BQXRDRixRQUFRRSxTQUFTLENBQUNGLFFBQVFDLE1BQU0sR0FBRztBQUM1RTtBQUVBLDZEQUE2RDtBQUN0RCxTQUFTRSxnQ0FBZ0MzQyxZQUFtQjtJQUNqRSxJQUFJQSxpQkFBaUIsR0FBRztRQUN0QixPQUFPO0lBQ1QsT0FBTztRQUNMLE9BQU87SUFDVDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy91dGlscy90cmFuc2FjdGlvbnMudHM/MGQ4ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHRvc0NsaWVudCB9IGZyb20gJ2FwdG9zJztcblxuLy8gSW5pdGlhbGl6ZSB0aGUgQXB0b3MgY2xpZW50XG5jb25zdCBjbGllbnQgPSBuZXcgQXB0b3NDbGllbnQoJ2h0dHBzOi8vZnVsbG5vZGUudGVzdG5ldC5hcHRvc2xhYnMuY29tL3YxJyk7XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byB0cmFuc2ZlciBmdW5kcyBmcm9tIGEgcGxheWVyIHRvIHRoZSBlc2Nyb3dcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0cmFuc2ZlclRvRXNjcm93KFxuICBwbGF5ZXJOdW1iZXI6IDEgfCAyLCBcbiAgYW1vdW50OiBudW1iZXIsIFxuICB0YXJnZXRBZGRyZXNzOiBzdHJpbmcsXG4gIHVzZVNpbXVsYXRpb25Nb2RlOiBib29sZWFuID0gZmFsc2Vcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBjb25zb2xlLmxvZyhgVHJhbnNmZXJyaW5nICR7YW1vdW50fSBBUFQgZnJvbSBQbGF5ZXIgJHtwbGF5ZXJOdW1iZXJ9IHRvICR7dGFyZ2V0QWRkcmVzc31gKTtcbiAgXG4gIC8vIEZvciB0ZXN0aW5nIG9ubHkgLSBzaW11bGF0aW9uIG1vZGUgZG9lc24ndCBkbyBhY3R1YWwgdHJhbnNmZXJzXG4gIGlmICh1c2VTaW11bGF0aW9uTW9kZSkge1xuICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgc2ltdWxhdGlvbiBtb2RlIGZvciBlc2Nyb3cgdHJhbnNmZXIgKG5vIGFjdHVhbCBmdW5kcyB3aWxsIGJlIG1vdmVkKVwiKTtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpOyAvLyBNb2NrIHRyYW5zYWN0aW9uIGRlbGF5XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgXG4gIC8vIFZhbGlkYXRlIHRhcmdldCBhZGRyZXNzXG4gIGlmICghdGFyZ2V0QWRkcmVzcyB8fCB0YXJnZXRBZGRyZXNzLnRyaW0oKSA9PT0gJycpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCB0YXJnZXQgYWRkcmVzczpcIiwgdGFyZ2V0QWRkcmVzcyk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCByZWNpcGllbnQgYWRkcmVzcy4gVW5hYmxlIHRvIHByb2Nlc3MgdHJhbnNmZXIuXCIpO1xuICB9XG4gIFxuICAvLyBDb252ZXJ0IGFtb3VudCB0byBvY3Rhc1xuICBjb25zdCBhbW91bnRJbk9jdGFzID0gTWF0aC5mbG9vcihhbW91bnQgKiAxMDAwMDAwMDApLnRvU3RyaW5nKCk7XG4gIGNvbnNvbGUubG9nKGBBbW91bnQgaW4gT2N0YXM6ICR7YW1vdW50SW5PY3Rhc31gKTtcbiAgXG4gIC8vIENyZWF0ZSBwYXlsb2FkXG4gIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgdHlwZTogXCJlbnRyeV9mdW5jdGlvbl9wYXlsb2FkXCIsXG4gICAgZnVuY3Rpb246IFwiMHgxOjpjb2luOjp0cmFuc2ZlclwiLFxuICAgIHR5cGVfYXJndW1lbnRzOiBbXCIweDE6OmFwdG9zX2NvaW46OkFwdG9zQ29pblwiXSxcbiAgICBhcmd1bWVudHM6IFt0YXJnZXRBZGRyZXNzLCBhbW91bnRJbk9jdGFzXVxuICB9O1xuICBcbiAgY29uc29sZS5sb2coXCJUcmFuc2FjdGlvbiBwYXlsb2FkIGNyZWF0ZWQ6XCIsIEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcbiAgXG4gIC8vIFN1Ym1pdCB0aGUgdHJhbnNhY3Rpb24gLSB0cnkgZGlyZWN0IG1ldGhvZCBmaXJzdFxuICB0cnkge1xuICAgIGxldCB0eEhhc2ggPSBcIlwiO1xuICAgIFxuICAgIC8vIFRyeSBkaXJlY3QgUGV0cmEgbWV0aG9kIGZpcnN0XG4gICAgaWYgKHdpbmRvdy5hcHRvcyAmJiB0eXBlb2Ygd2luZG93LmFwdG9zLnNpZ25BbmRTdWJtaXRUcmFuc2FjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5sb2coXCJVc2luZyBkaXJlY3QgUGV0cmEgd2FsbGV0IGZvciB0cmFuc2FjdGlvblwiKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIEZvcmNlIGZvY3VzIG9uIGN1cnJlbnQgd2luZG93IHRvIGhlbHAgcG9wdXAgYXBwZWFyXG4gICAgICAgIHdpbmRvdy5mb2N1cygpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB3aW5kb3cuYXB0b3Muc2lnbkFuZFN1Ym1pdFRyYW5zYWN0aW9uKHBheWxvYWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRpcmVjdCB0cmFuc2FjdGlvbiByZXNwb25zZTpcIiwgcmVzcG9uc2UpO1xuICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuaGFzaCkge1xuICAgICAgICAgIHR4SGFzaCA9IHJlc3BvbnNlLmhhc2g7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJUcmFuc2FjdGlvbiBoYXNoIHJlY2VpdmVkOlwiLCB0eEhhc2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEaXJlY3QgdHJhbnNhY3Rpb24gcmVzcG9uc2UgbWlzc2luZyBoYXNoOlwiLCByZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGRpcmVjdEVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJEaXJlY3QgdHJhbnNhY3Rpb24gZXJyb3I6XCIsIGRpcmVjdEVycm9yKTtcbiAgICAgICAgaWYgKGRpcmVjdEVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRyYW5zYWN0aW9uIGZhaWxlZDogJHtkaXJlY3RFcnJvci5tZXNzYWdlfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIElmIHdlIHN0aWxsIGRvbid0IGhhdmUgYSBoYXNoLCB0aGUgdHJhbnNhY3Rpb24gZmFpbGVkXG4gICAgaWYgKCF0eEhhc2gpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRyYW5zYWN0aW9uIGZhaWxlZC4gTWFrZSBzdXJlIHlvdXIgd2FsbGV0IGlzIHVubG9ja2VkIGFuZCBoYXMgc3VmZmljaWVudCBmdW5kcy5cIik7XG4gICAgfVxuICAgIFxuICAgIC8vIFdhaXQgZm9yIHRyYW5zYWN0aW9uIGNvbmZpcm1hdGlvblxuICAgIGNvbnNvbGUubG9nKGBUcmFuc2FjdGlvbiBzdWJtaXR0ZWQgd2l0aCBoYXNoOiAke3R4SGFzaH1gKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coXCJXYWl0aW5nIGZvciB0cmFuc2FjdGlvbiBjb25maXJtYXRpb24uLi5cIik7XG4gICAgICBjb25zdCB0eFJlc3VsdCA9IGF3YWl0IGNsaWVudC53YWl0Rm9yVHJhbnNhY3Rpb25XaXRoUmVzdWx0KHR4SGFzaCk7XG4gICAgICBjb25zb2xlLmxvZyhgVHJhbnNmZXIgZm9yIFBsYXllciAke3BsYXllck51bWJlcn0gY29uZmlybWVkOmAsIHR4UmVzdWx0KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGNvbmZpcm1FcnJvcikge1xuICAgICAgY29uc29sZS53YXJuKFwiRXJyb3IgY29uZmlybWluZyB0cmFuc2FjdGlvbjpcIiwgY29uZmlybUVycm9yKTtcbiAgICAgIC8vIFRyYW5zYWN0aW9uIG1pZ2h0IHN0aWxsIGdvIHRocm91Z2gsIHNvIHdlJ2xsIGNvbnNpZGVyIHRoaXMgYSBzdWNjZXNzXG4gICAgICBjb25zb2xlLmxvZyhcIkNvbnRpbnVpbmcgZGVzcGl0ZSBjb25maXJtYXRpb24gZXJyb3IgKHRyYW5zYWN0aW9uIG1heSBzdGlsbCBiZSBwcm9jZXNzaW5nKVwiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAodHhFcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihgRXJyb3IgaW4gdHJhbnNmZXIgZm9yIFBsYXllciAke3BsYXllck51bWJlcn06YCwgdHhFcnJvcik7XG4gICAgaWYgKHR4RXJyb3IubWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gdHJhbnNmZXIgZnVuZHM6ICR7dHhFcnJvci5tZXNzYWdlfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gdHJhbnNmZXIgZnVuZHMuIFBsZWFzZSBjaGVjayB5b3VyIHdhbGxldCBhbmQgdHJ5IGFnYWluLlwiKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gRnVuY3Rpb24gdG8gY2hlY2sgaWYgUGV0cmEgd2FsbGV0IGlzIGluc3RhbGxlZCBhbmQgYXZhaWxhYmxlXG5leHBvcnQgZnVuY3Rpb24gaXNQZXRyYVdhbGxldEF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIFxuICAgICAgICAgdHlwZW9mIHdpbmRvdy5hcHRvcyAhPT0gJ3VuZGVmaW5lZCcgJiYgXG4gICAgICAgICB0eXBlb2Ygd2luZG93LmFwdG9zLmNvbm5lY3QgPT09ICdmdW5jdGlvbic7XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBmb3JtYXQgd2FsbGV0IGFkZHJlc3MgZm9yIGRpc3BsYXlcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRXYWxsZXRBZGRyZXNzKGFkZHJlc3M6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICghYWRkcmVzcykgcmV0dXJuICcnO1xuICBcbiAgaWYgKGFkZHJlc3MubGVuZ3RoIDwgMTApIHJldHVybiBhZGRyZXNzO1xuICBcbiAgcmV0dXJuIGAke2FkZHJlc3Muc3Vic3RyaW5nKDAsIDYpfS4uLiR7YWRkcmVzcy5zdWJzdHJpbmcoYWRkcmVzcy5sZW5ndGggLSA0KX1gO1xufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IGluc3RydWN0aW9ucyBiYXNlZCBvbiBwbGF5ZXIgbnVtYmVyXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2FsbGV0Q29ubmVjdGlvbkluc3RydWN0aW9ucyhwbGF5ZXJOdW1iZXI6IDEgfCAyKTogc3RyaW5nIHtcbiAgaWYgKHBsYXllck51bWJlciA9PT0gMSkge1xuICAgIHJldHVybiBcIkNvbm5lY3QgeW91ciBQbGF5ZXIgMSB3YWxsZXQgYnkgY2xpY2tpbmcgdGhlIGJ1dHRvbiBiZWxvdy5cIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJDb25uZWN0IFBsYXllciAyJ3Mgd2FsbGV0OlwiO1xuICB9XG59ICJdLCJuYW1lcyI6WyJBcHRvc0NsaWVudCIsImNsaWVudCIsInRyYW5zZmVyVG9Fc2Nyb3ciLCJwbGF5ZXJOdW1iZXIiLCJhbW91bnQiLCJ0YXJnZXRBZGRyZXNzIiwidXNlU2ltdWxhdGlvbk1vZGUiLCJjb25zb2xlIiwibG9nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwidHJpbSIsImVycm9yIiwiRXJyb3IiLCJhbW91bnRJbk9jdGFzIiwiTWF0aCIsImZsb29yIiwidG9TdHJpbmciLCJwYXlsb2FkIiwidHlwZSIsImZ1bmN0aW9uIiwidHlwZV9hcmd1bWVudHMiLCJhcmd1bWVudHMiLCJKU09OIiwic3RyaW5naWZ5IiwidHhIYXNoIiwid2luZG93IiwiYXB0b3MiLCJzaWduQW5kU3VibWl0VHJhbnNhY3Rpb24iLCJmb2N1cyIsInJlc3BvbnNlIiwiaGFzaCIsImRpcmVjdEVycm9yIiwibWVzc2FnZSIsInR4UmVzdWx0Iiwid2FpdEZvclRyYW5zYWN0aW9uV2l0aFJlc3VsdCIsImNvbmZpcm1FcnJvciIsIndhcm4iLCJ0eEVycm9yIiwiaXNQZXRyYVdhbGxldEF2YWlsYWJsZSIsImNvbm5lY3QiLCJmb3JtYXRXYWxsZXRBZGRyZXNzIiwiYWRkcmVzcyIsImxlbmd0aCIsInN1YnN0cmluZyIsImdldFdhbGxldENvbm5lY3Rpb25JbnN0cnVjdGlvbnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/utils/transactions.ts\n"));

/***/ })

});