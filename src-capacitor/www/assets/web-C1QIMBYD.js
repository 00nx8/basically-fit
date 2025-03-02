import { W as WebPlugin } from "./index-DiEwj2lb.js";
const RecordingStatus = {
  RECORDING: "RECORDING",
  PAUSED: "PAUSED",
  NONE: "NONE"
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var getBlobDuration$1 = {};
var interopRequireDefault;
var hasRequiredInteropRequireDefault;
function requireInteropRequireDefault() {
  if (hasRequiredInteropRequireDefault) return interopRequireDefault;
  hasRequiredInteropRequireDefault = 1;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  interopRequireDefault = _interopRequireDefault;
  return interopRequireDefault;
}
var runtime = { exports: {} };
var hasRequiredRuntime;
function requireRuntime() {
  if (hasRequiredRuntime) return runtime.exports;
  hasRequiredRuntime = 1;
  (function(module) {
    var runtime2 = function(exports) {
      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
      };
      var undefined$1;
      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
        return obj[key];
      }
      try {
        define({}, "");
      } catch (err) {
        define = function(obj, key, value) {
          return obj[key] = value;
        };
      }
      function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });
        return generator;
      }
      exports.wrap = wrap;
      function tryCatch(fn, obj, arg) {
        try {
          return { type: "normal", arg: fn.call(obj, arg) };
        } catch (err) {
          return { type: "throw", arg: err };
        }
      }
      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed";
      var ContinueSentinel = {};
      function Generator() {
      }
      function GeneratorFunction() {
      }
      function GeneratorFunctionPrototype() {
      }
      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function() {
        return this;
      });
      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        IteratorPrototype = NativeIteratorPrototype;
      }
      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = GeneratorFunctionPrototype;
      defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
      defineProperty(
        GeneratorFunctionPrototype,
        "constructor",
        { value: GeneratorFunction, configurable: true }
      );
      GeneratorFunction.displayName = define(
        GeneratorFunctionPrototype,
        toStringTagSymbol,
        "GeneratorFunction"
      );
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function(method) {
          define(prototype, method, function(arg) {
            return this._invoke(method, arg);
          });
        });
      }
      exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };
      exports.mark = function(genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };
      exports.awrap = function(arg) {
        return { __await: arg };
      };
      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;
            if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(function(value2) {
                invoke("next", value2, resolve, reject);
              }, function(err) {
                invoke("throw", err, resolve, reject);
              });
            }
            return PromiseImpl.resolve(value).then(function(unwrapped) {
              result.value = unwrapped;
              resolve(result);
            }, function(error) {
              return invoke("throw", error, resolve, reject);
            });
          }
        }
        var previousPromise;
        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function(resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
        }
        defineProperty(this, "_invoke", { value: enqueue });
      }
      defineIteratorMethods(AsyncIterator.prototype);
      define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
      });
      exports.AsyncIterator = AsyncIterator;
      exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(
          wrap(innerFn, outerFn, self, tryLocsList),
          PromiseImpl
        );
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
      };
      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }
          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            }
            return doneResult();
          }
          context.method = method;
          context.arg = arg;
          while (true) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if (context.method === "next") {
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }
              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }
            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);
            if (record.type === "normal") {
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;
              if (record.arg === ContinueSentinel) {
                continue;
              }
              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted;
              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      }
      function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method;
        var method = delegate.iterator[methodName];
        if (method === undefined$1) {
          context.delegate = null;
          if (methodName === "throw" && delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);
            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }
          if (methodName !== "return") {
            context.method = "throw";
            context.arg = new TypeError(
              "The iterator does not provide a '" + methodName + "' method"
            );
          }
          return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }
        if (info.done) {
          context[delegate.resultName] = info.value;
          context.next = delegate.nextLoc;
          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          return info;
        }
        context.delegate = null;
        return ContinueSentinel;
      }
      defineIteratorMethods(Gp);
      define(Gp, toStringTagSymbol, "Generator");
      define(Gp, iteratorSymbol, function() {
        return this;
      });
      define(Gp, "toString", function() {
        return "[object Generator]";
      });
      function pushTryEntry(locs) {
        var entry = { tryLoc: locs[0] };
        if (1 in locs) {
          entry.catchLoc = locs[1];
        }
        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }
      function Context(tryLocsList) {
        this.tryEntries = [{ tryLoc: "root" }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }
      exports.keys = function(val) {
        var object = Object(val);
        var keys = [];
        for (var key in object) {
          keys.push(key);
        }
        keys.reverse();
        return function next() {
          while (keys.length) {
            var key2 = keys.pop();
            if (key2 in object) {
              next.value = key2;
              next.done = false;
              return next;
            }
          }
          next.done = true;
          return next;
        };
      };
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }
          if (typeof iterable.next === "function") {
            return iterable;
          }
          if (!isNaN(iterable.length)) {
            var i = -1, next = function next2() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next2.value = iterable[i];
                  next2.done = false;
                  return next2;
                }
              }
              next2.value = undefined$1;
              next2.done = true;
              return next2;
            };
            return next.next = next;
          }
        }
        return { next: doneResult };
      }
      exports.values = values;
      function doneResult() {
        return { value: undefined$1, done: true };
      }
      Context.prototype = {
        constructor: Context,
        reset: function(skipTempReset) {
          this.prev = 0;
          this.next = 0;
          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined$1;
          this.tryEntries.forEach(resetTryEntry);
          if (!skipTempReset) {
            for (var name in this) {
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },
        stop: function() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;
          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }
          return this.rval;
        },
        dispatchException: function(exception) {
          if (this.done) {
            throw exception;
          }
          var context = this;
          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;
            if (caught) {
              context.method = "next";
              context.arg = undefined$1;
            }
            return !!caught;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;
            if (entry.tryLoc === "root") {
              return handle("end");
            }
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }
          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            finallyEntry = null;
          }
          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;
          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }
          return this.complete(record);
        },
        complete: function(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }
          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }
          return ContinueSentinel;
        },
        finish: function(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName,
            nextLoc
          };
          if (this.method === "next") {
            this.arg = undefined$1;
          }
          return ContinueSentinel;
        }
      };
      return exports;
    }(
      // If this script is executing as a CommonJS module, use module.exports
      // as the regeneratorRuntime namespace. Otherwise create a new empty
      // object. Either way, the resulting object will be used to initialize
      // the regeneratorRuntime variable at the top of this file.
      module.exports
    );
    try {
      regeneratorRuntime = runtime2;
    } catch (accidentalStrictMode) {
      if (typeof globalThis === "object") {
        globalThis.regeneratorRuntime = runtime2;
      } else {
        Function("r", "regeneratorRuntime = r")(runtime2);
      }
    }
  })(runtime);
  return runtime.exports;
}
var regenerator;
var hasRequiredRegenerator;
function requireRegenerator() {
  if (hasRequiredRegenerator) return regenerator;
  hasRequiredRegenerator = 1;
  regenerator = requireRuntime();
  return regenerator;
}
var asyncToGenerator;
var hasRequiredAsyncToGenerator;
function requireAsyncToGenerator() {
  if (hasRequiredAsyncToGenerator) return asyncToGenerator;
  hasRequiredAsyncToGenerator = 1;
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(void 0);
      });
    };
  }
  asyncToGenerator = _asyncToGenerator;
  return asyncToGenerator;
}
var hasRequiredGetBlobDuration;
function requireGetBlobDuration() {
  if (hasRequiredGetBlobDuration) return getBlobDuration$1;
  hasRequiredGetBlobDuration = 1;
  (function(exports) {
    var _interopRequireDefault = requireInteropRequireDefault();
    Object.defineProperty(exports, "__esModule", { value: true }), exports.default = getBlobDuration2;
    var _regenerator = _interopRequireDefault(requireRegenerator()), _asyncToGenerator2 = _interopRequireDefault(requireAsyncToGenerator());
    function getBlobDuration2(e) {
      return _getBlobDuration.apply(this, arguments);
    }
    function _getBlobDuration() {
      return (_getBlobDuration = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function e(r) {
        var t, n;
        return _regenerator.default.wrap(function(e2) {
          for (; ; ) switch (e2.prev = e2.next) {
            case 0:
              return t = document.createElement("video"), n = new Promise(function(e3, r2) {
                t.addEventListener("loadedmetadata", function() {
                  t.duration === 1 / 0 ? (t.currentTime = Number.MAX_SAFE_INTEGER, t.ontimeupdate = function() {
                    t.ontimeupdate = null, e3(t.duration), t.currentTime = 0;
                  }) : e3(t.duration);
                }), t.onerror = function(e4) {
                  return r2(e4.target.error);
                };
              }), t.src = "string" == typeof r || r instanceof String ? r : window.URL.createObjectURL(r), e2.abrupt("return", n);
            case 4:
            case "end":
              return e2.stop();
          }
        }, e);
      }))).apply(this, arguments);
    }
  })(getBlobDuration$1);
  return getBlobDuration$1;
}
var getBlobDurationExports = requireGetBlobDuration();
const getBlobDuration = /* @__PURE__ */ getDefaultExportFromCjs(getBlobDurationExports);
const successResponse = () => ({ value: true });
const failureResponse = () => ({ value: false });
const missingPermissionError = () => new Error("MISSING_PERMISSION");
const alreadyRecordingError = () => new Error("ALREADY_RECORDING");
const deviceCannotVoiceRecordError = () => new Error("DEVICE_CANNOT_VOICE_RECORD");
const failedToRecordError = () => new Error("FAILED_TO_RECORD");
const emptyRecordingError = () => new Error("EMPTY_RECORDING");
const recordingHasNotStartedError = () => new Error("RECORDING_HAS_NOT_STARTED");
const failedToFetchRecordingError = () => new Error("FAILED_TO_FETCH_RECORDING");
const couldNotQueryPermissionStatusError = () => new Error("COULD_NOT_QUERY_PERMISSION_STATUS");
const possibleMimeTypes = ["audio/aac", "audio/webm;codecs=opus", "audio/mp4", "audio/webm", "audio/ogg;codecs=opus"];
const neverResolvingPromise = () => new Promise(() => void 0);
class VoiceRecorderImpl {
  constructor() {
    this.mediaRecorder = null;
    this.chunks = [];
    this.pendingResult = neverResolvingPromise();
  }
  static async canDeviceVoiceRecord() {
    var _a;
    if (((_a = navigator === null || navigator === void 0 ? void 0 : navigator.mediaDevices) === null || _a === void 0 ? void 0 : _a.getUserMedia) == null || VoiceRecorderImpl.getSupportedMimeType() == null) {
      return failureResponse();
    } else {
      return successResponse();
    }
  }
  async startRecording() {
    if (this.mediaRecorder != null) {
      throw alreadyRecordingError();
    }
    const deviceCanRecord = await VoiceRecorderImpl.canDeviceVoiceRecord();
    if (!deviceCanRecord.value) {
      throw deviceCannotVoiceRecordError();
    }
    const havingPermission = await VoiceRecorderImpl.hasAudioRecordingPermission().catch(() => successResponse());
    if (!havingPermission.value) {
      throw missingPermissionError();
    }
    return navigator.mediaDevices.getUserMedia({ audio: true }).then(this.onSuccessfullyStartedRecording.bind(this)).catch(this.onFailedToStartRecording.bind(this));
  }
  async stopRecording() {
    if (this.mediaRecorder == null) {
      throw recordingHasNotStartedError();
    }
    try {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      return this.pendingResult;
    } catch (ignore) {
      throw failedToFetchRecordingError();
    } finally {
      this.prepareInstanceForNextOperation();
    }
  }
  static async hasAudioRecordingPermission() {
    if (navigator.permissions.query == null) {
      if (navigator.mediaDevices == null) {
        return Promise.reject(couldNotQueryPermissionStatusError());
      }
      return navigator.mediaDevices.getUserMedia({ audio: true }).then(() => successResponse()).catch(() => {
        throw couldNotQueryPermissionStatusError();
      });
    }
    return navigator.permissions.query({ name: "microphone" }).then((result) => ({ value: result.state === "granted" })).catch(() => {
      throw couldNotQueryPermissionStatusError();
    });
  }
  static async requestAudioRecordingPermission() {
    const havingPermission = await VoiceRecorderImpl.hasAudioRecordingPermission().catch(() => failureResponse());
    if (havingPermission.value) {
      return successResponse();
    }
    return navigator.mediaDevices.getUserMedia({ audio: true }).then(() => successResponse()).catch(() => failureResponse());
  }
  pauseRecording() {
    if (this.mediaRecorder == null) {
      throw recordingHasNotStartedError();
    } else if (this.mediaRecorder.state === "recording") {
      this.mediaRecorder.pause();
      return Promise.resolve(successResponse());
    } else {
      return Promise.resolve(failureResponse());
    }
  }
  resumeRecording() {
    if (this.mediaRecorder == null) {
      throw recordingHasNotStartedError();
    } else if (this.mediaRecorder.state === "paused") {
      this.mediaRecorder.resume();
      return Promise.resolve(successResponse());
    } else {
      return Promise.resolve(failureResponse());
    }
  }
  getCurrentStatus() {
    if (this.mediaRecorder == null) {
      return Promise.resolve({ status: RecordingStatus.NONE });
    } else if (this.mediaRecorder.state === "recording") {
      return Promise.resolve({ status: RecordingStatus.RECORDING });
    } else if (this.mediaRecorder.state === "paused") {
      return Promise.resolve({ status: RecordingStatus.PAUSED });
    } else {
      return Promise.resolve({ status: RecordingStatus.NONE });
    }
  }
  static getSupportedMimeType() {
    if ((MediaRecorder === null || MediaRecorder === void 0 ? void 0 : MediaRecorder.isTypeSupported) == null)
      return null;
    const foundSupportedType = possibleMimeTypes.find((type) => MediaRecorder.isTypeSupported(type));
    return foundSupportedType !== null && foundSupportedType !== void 0 ? foundSupportedType : null;
  }
  onSuccessfullyStartedRecording(stream) {
    this.pendingResult = new Promise((resolve, reject) => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onerror = () => {
        this.prepareInstanceForNextOperation();
        reject(failedToRecordError());
      };
      this.mediaRecorder.onstop = async () => {
        const mimeType = VoiceRecorderImpl.getSupportedMimeType();
        if (mimeType == null) {
          this.prepareInstanceForNextOperation();
          reject(failedToFetchRecordingError());
          return;
        }
        const blobVoiceRecording = new Blob(this.chunks, { type: mimeType });
        if (blobVoiceRecording.size <= 0) {
          this.prepareInstanceForNextOperation();
          reject(emptyRecordingError());
          return;
        }
        const recordDataBase64 = await VoiceRecorderImpl.blobToBase64(blobVoiceRecording);
        const recordingDuration = await getBlobDuration(blobVoiceRecording);
        this.prepareInstanceForNextOperation();
        resolve({ value: { recordDataBase64, mimeType, msDuration: recordingDuration * 1e3 } });
      };
      this.mediaRecorder.ondataavailable = (event) => this.chunks.push(event.data);
      this.mediaRecorder.start();
    });
    return successResponse();
  }
  onFailedToStartRecording() {
    this.prepareInstanceForNextOperation();
    throw failedToRecordError();
  }
  static blobToBase64(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const recordingResult = String(reader.result);
        const splitResult = recordingResult.split("base64,");
        const toResolve = splitResult.length > 1 ? splitResult[1] : recordingResult;
        resolve(toResolve.trim());
      };
      reader.readAsDataURL(blob);
    });
  }
  prepareInstanceForNextOperation() {
    if (this.mediaRecorder != null && this.mediaRecorder.state === "recording") {
      try {
        this.mediaRecorder.stop();
      } catch (error) {
        console.warn("While trying to stop a media recorder, an error was thrown", error);
      }
    }
    this.pendingResult = neverResolvingPromise();
    this.mediaRecorder = null;
    this.chunks = [];
  }
}
class VoiceRecorderWeb extends WebPlugin {
  constructor() {
    super(...arguments);
    this.voiceRecorderInstance = new VoiceRecorderImpl();
  }
  canDeviceVoiceRecord() {
    return VoiceRecorderImpl.canDeviceVoiceRecord();
  }
  hasAudioRecordingPermission() {
    return VoiceRecorderImpl.hasAudioRecordingPermission();
  }
  requestAudioRecordingPermission() {
    return VoiceRecorderImpl.requestAudioRecordingPermission();
  }
  startRecording() {
    return this.voiceRecorderInstance.startRecording();
  }
  stopRecording() {
    return this.voiceRecorderInstance.stopRecording();
  }
  pauseRecording() {
    return this.voiceRecorderInstance.pauseRecording();
  }
  resumeRecording() {
    return this.voiceRecorderInstance.resumeRecording();
  }
  getCurrentStatus() {
    return this.voiceRecorderInstance.getCurrentStatus();
  }
}
export {
  VoiceRecorderWeb
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLUMxUUlNQllELmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvY2FwYWNpdG9yLXZvaWNlLXJlY29yZGVyL2Rpc3QvZXNtL2RlZmluaXRpb25zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvZ2V0LWJsb2ItZHVyYXRpb24vZGlzdC9nZXRCbG9iRHVyYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY2FwYWNpdG9yLXZvaWNlLXJlY29yZGVyL2Rpc3QvZXNtL3ByZWRlZmluZWQtd2ViLXJlc3BvbnNlcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jYXBhY2l0b3Itdm9pY2UtcmVjb3JkZXIvZGlzdC9lc20vVm9pY2VSZWNvcmRlckltcGwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY2FwYWNpdG9yLXZvaWNlLXJlY29yZGVyL2Rpc3QvZXNtL3dlYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgUmVjb3JkaW5nU3RhdHVzID0ge1xuICAgIFJFQ09SRElORzogJ1JFQ09SRElORycsXG4gICAgUEFVU0VEOiAnUEFVU0VEJyxcbiAgICBOT05FOiAnTk9ORScsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmaW5pdGlvbnMuanMubWFwIiwiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5IHx8IGZ1bmN0aW9uIChvYmosIGtleSwgZGVzYykgeyBvYmpba2V5XSA9IGRlc2MudmFsdWU7IH07XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGRlZmluZVByb3BlcnR5KGdlbmVyYXRvciwgXCJfaW52b2tlXCIsIHsgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkgfSk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lUHJvcGVydHkoR3AsIFwiY29uc3RydWN0b3JcIiwgeyB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgZGVmaW5lUHJvcGVydHkoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgXCJjb25zdHJ1Y3RvclwiLFxuICAgIHsgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uLCBjb25maWd1cmFibGU6IHRydWUgfVxuICApO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgXCJfaW52b2tlXCIsIHsgdmFsdWU6IGVucXVldWUgfSk7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kTmFtZSA9IGNvbnRleHQubWV0aG9kO1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2ROYW1lXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kLCBvciBhIG1pc3NpbmcgLm5leHQgbWVodG9kLCBhbHdheXMgdGVybWluYXRlIHRoZVxuICAgICAgLy8geWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgIGlmIChtZXRob2ROYW1lID09PSBcInRocm93XCIgJiYgZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1ldGhvZE5hbWUgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ1wiICsgbWV0aG9kTmFtZSArIFwiJyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHZhciBvYmplY3QgPSBPYmplY3QodmFsKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCJcInVzZSBzdHJpY3RcIjt2YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdD1yZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZXhwb3J0cy5kZWZhdWx0PWdldEJsb2JEdXJhdGlvbjt2YXIgX3JlZ2VuZXJhdG9yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yXCIpKSxfYXN5bmNUb0dlbmVyYXRvcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpKTtmdW5jdGlvbiBnZXRCbG9iRHVyYXRpb24oZSl7cmV0dXJuIF9nZXRCbG9iRHVyYXRpb24uYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIF9nZXRCbG9iRHVyYXRpb24oKXtyZXR1cm4oX2dldEJsb2JEdXJhdGlvbj0oMCxfYXN5bmNUb0dlbmVyYXRvcjIuZGVmYXVsdCkoX3JlZ2VuZXJhdG9yLmRlZmF1bHQubWFyayhmdW5jdGlvbiBlKHIpe3ZhciB0LG47cmV0dXJuIF9yZWdlbmVyYXRvci5kZWZhdWx0LndyYXAoZnVuY3Rpb24oZSl7Zm9yKDs7KXN3aXRjaChlLnByZXY9ZS5uZXh0KXtjYXNlIDA6cmV0dXJuIHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpLG49bmV3IFByb21pc2UoZnVuY3Rpb24oZSxyKXt0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRtZXRhZGF0YVwiLGZ1bmN0aW9uKCl7dC5kdXJhdGlvbj09PTEvMD8odC5jdXJyZW50VGltZT1OdW1iZXIuTUFYX1NBRkVfSU5URUdFUix0Lm9udGltZXVwZGF0ZT1mdW5jdGlvbigpe3Qub250aW1ldXBkYXRlPW51bGwsZSh0LmR1cmF0aW9uKSx0LmN1cnJlbnRUaW1lPTB9KTplKHQuZHVyYXRpb24pfSksdC5vbmVycm9yPWZ1bmN0aW9uKGUpe3JldHVybiByKGUudGFyZ2V0LmVycm9yKX19KSx0LnNyYz1cInN0cmluZ1wiPT10eXBlb2Ygcnx8ciBpbnN0YW5jZW9mIFN0cmluZz9yOndpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHIpLGUuYWJydXB0KFwicmV0dXJuXCIsbik7Y2FzZSA0OmNhc2VcImVuZFwiOnJldHVybiBlLnN0b3AoKX19LGUpfSkpKS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZXRCbG9iRHVyYXRpb24uanMubWFwXG4iLCJleHBvcnQgY29uc3Qgc3VjY2Vzc1Jlc3BvbnNlID0gKCkgPT4gKHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnQgY29uc3QgZmFpbHVyZVJlc3BvbnNlID0gKCkgPT4gKHsgdmFsdWU6IGZhbHNlIH0pO1xuZXhwb3J0IGNvbnN0IG1pc3NpbmdQZXJtaXNzaW9uRXJyb3IgPSAoKSA9PiBuZXcgRXJyb3IoJ01JU1NJTkdfUEVSTUlTU0lPTicpO1xuZXhwb3J0IGNvbnN0IGFscmVhZHlSZWNvcmRpbmdFcnJvciA9ICgpID0+IG5ldyBFcnJvcignQUxSRUFEWV9SRUNPUkRJTkcnKTtcbmV4cG9ydCBjb25zdCBtaWNyb3Bob25lQmVpbmdVc2VkRXJyb3IgPSAoKSA9PiBuZXcgRXJyb3IoJ01JQ1JPUEhPTkVfQkVJTkdfVVNFRCcpO1xuZXhwb3J0IGNvbnN0IGRldmljZUNhbm5vdFZvaWNlUmVjb3JkRXJyb3IgPSAoKSA9PiBuZXcgRXJyb3IoJ0RFVklDRV9DQU5OT1RfVk9JQ0VfUkVDT1JEJyk7XG5leHBvcnQgY29uc3QgZmFpbGVkVG9SZWNvcmRFcnJvciA9ICgpID0+IG5ldyBFcnJvcignRkFJTEVEX1RPX1JFQ09SRCcpO1xuZXhwb3J0IGNvbnN0IGVtcHR5UmVjb3JkaW5nRXJyb3IgPSAoKSA9PiBuZXcgRXJyb3IoJ0VNUFRZX1JFQ09SRElORycpO1xuZXhwb3J0IGNvbnN0IHJlY29yZGluZ0hhc05vdFN0YXJ0ZWRFcnJvciA9ICgpID0+IG5ldyBFcnJvcignUkVDT1JESU5HX0hBU19OT1RfU1RBUlRFRCcpO1xuZXhwb3J0IGNvbnN0IGZhaWxlZFRvRmV0Y2hSZWNvcmRpbmdFcnJvciA9ICgpID0+IG5ldyBFcnJvcignRkFJTEVEX1RPX0ZFVENIX1JFQ09SRElORycpO1xuZXhwb3J0IGNvbnN0IGNvdWxkTm90UXVlcnlQZXJtaXNzaW9uU3RhdHVzRXJyb3IgPSAoKSA9PiBuZXcgRXJyb3IoJ0NPVUxEX05PVF9RVUVSWV9QRVJNSVNTSU9OX1NUQVRVUycpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJlZGVmaW5lZC13ZWItcmVzcG9uc2VzLmpzLm1hcCIsImltcG9ydCBnZXRCbG9iRHVyYXRpb24gZnJvbSAnZ2V0LWJsb2ItZHVyYXRpb24nO1xuaW1wb3J0IHsgUmVjb3JkaW5nU3RhdHVzIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5pbXBvcnQgeyBhbHJlYWR5UmVjb3JkaW5nRXJyb3IsIGNvdWxkTm90UXVlcnlQZXJtaXNzaW9uU3RhdHVzRXJyb3IsIGRldmljZUNhbm5vdFZvaWNlUmVjb3JkRXJyb3IsIGVtcHR5UmVjb3JkaW5nRXJyb3IsIGZhaWxlZFRvRmV0Y2hSZWNvcmRpbmdFcnJvciwgZmFpbGVkVG9SZWNvcmRFcnJvciwgZmFpbHVyZVJlc3BvbnNlLCBtaXNzaW5nUGVybWlzc2lvbkVycm9yLCByZWNvcmRpbmdIYXNOb3RTdGFydGVkRXJyb3IsIHN1Y2Nlc3NSZXNwb25zZSwgfSBmcm9tICcuL3ByZWRlZmluZWQtd2ViLXJlc3BvbnNlcyc7XG4vLyB0aGVzZSBtaW1lIHR5cGVzIHdpbGwgYmUgY2hlY2tlZCBvbmUgYnkgb25lIGluIG9yZGVyIHVudGlsIG9uZSBvZiB0aGVtIGlzIGZvdW5kIHRvIGJlIHN1cHBvcnRlZCBieSB0aGUgY3VycmVudCBicm93c2VyXG5jb25zdCBwb3NzaWJsZU1pbWVUeXBlcyA9IFsnYXVkaW8vYWFjJywgJ2F1ZGlvL3dlYm07Y29kZWNzPW9wdXMnLCAnYXVkaW8vbXA0JywgJ2F1ZGlvL3dlYm0nLCAnYXVkaW8vb2dnO2NvZGVjcz1vcHVzJ107XG5jb25zdCBuZXZlclJlc29sdmluZ1Byb21pc2UgPSAoKSA9PiBuZXcgUHJvbWlzZSgoKSA9PiB1bmRlZmluZWQpO1xuZXhwb3J0IGNsYXNzIFZvaWNlUmVjb3JkZXJJbXBsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tZWRpYVJlY29yZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaHVua3MgPSBbXTtcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVzdWx0ID0gbmV2ZXJSZXNvbHZpbmdQcm9taXNlKCk7XG4gICAgfVxuICAgIHN0YXRpYyBhc3luYyBjYW5EZXZpY2VWb2ljZVJlY29yZCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoKChfYSA9IG5hdmlnYXRvciA9PT0gbnVsbCB8fCBuYXZpZ2F0b3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5hdmlnYXRvci5tZWRpYURldmljZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRVc2VyTWVkaWEpID09IG51bGwgfHwgVm9pY2VSZWNvcmRlckltcGwuZ2V0U3VwcG9ydGVkTWltZVR5cGUoKSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFpbHVyZVJlc3BvbnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3VjY2Vzc1Jlc3BvbnNlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgc3RhcnRSZWNvcmRpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lZGlhUmVjb3JkZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgYWxyZWFkeVJlY29yZGluZ0Vycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGV2aWNlQ2FuUmVjb3JkID0gYXdhaXQgVm9pY2VSZWNvcmRlckltcGwuY2FuRGV2aWNlVm9pY2VSZWNvcmQoKTtcbiAgICAgICAgaWYgKCFkZXZpY2VDYW5SZWNvcmQudmFsdWUpIHtcbiAgICAgICAgICAgIHRocm93IGRldmljZUNhbm5vdFZvaWNlUmVjb3JkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoYXZpbmdQZXJtaXNzaW9uID0gYXdhaXQgVm9pY2VSZWNvcmRlckltcGwuaGFzQXVkaW9SZWNvcmRpbmdQZXJtaXNzaW9uKCkuY2F0Y2goKCkgPT4gc3VjY2Vzc1Jlc3BvbnNlKCkpO1xuICAgICAgICBpZiAoIWhhdmluZ1Blcm1pc3Npb24udmFsdWUpIHtcbiAgICAgICAgICAgIHRocm93IG1pc3NpbmdQZXJtaXNzaW9uRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgICAgICAgLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pXG4gICAgICAgICAgICAudGhlbih0aGlzLm9uU3VjY2Vzc2Z1bGx5U3RhcnRlZFJlY29yZGluZy5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMub25GYWlsZWRUb1N0YXJ0UmVjb3JkaW5nLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBhc3luYyBzdG9wUmVjb3JkaW5nKCkge1xuICAgICAgICBpZiAodGhpcy5tZWRpYVJlY29yZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IHJlY29yZGluZ0hhc05vdFN0YXJ0ZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4gdHJhY2suc3RvcCgpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBlbmRpbmdSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGlnbm9yZSkge1xuICAgICAgICAgICAgdGhyb3cgZmFpbGVkVG9GZXRjaFJlY29yZGluZ0Vycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVJbnN0YW5jZUZvck5leHRPcGVyYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgYXN5bmMgaGFzQXVkaW9SZWNvcmRpbmdQZXJtaXNzaW9uKCkge1xuICAgICAgICBpZiAobmF2aWdhdG9yLnBlcm1pc3Npb25zLnF1ZXJ5ID09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoY291bGROb3RRdWVyeVBlcm1pc3Npb25TdGF0dXNFcnJvcigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gICAgICAgICAgICAgICAgLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gc3VjY2Vzc1Jlc3BvbnNlKCkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBjb3VsZE5vdFF1ZXJ5UGVybWlzc2lvblN0YXR1c0Vycm9yKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnBlcm1pc3Npb25zXG4gICAgICAgICAgICAucXVlcnkoeyBuYW1lOiAnbWljcm9waG9uZScgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+ICh7IHZhbHVlOiByZXN1bHQuc3RhdGUgPT09ICdncmFudGVkJyB9KSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBjb3VsZE5vdFF1ZXJ5UGVybWlzc2lvblN0YXR1c0Vycm9yKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgYXN5bmMgcmVxdWVzdEF1ZGlvUmVjb3JkaW5nUGVybWlzc2lvbigpIHtcbiAgICAgICAgY29uc3QgaGF2aW5nUGVybWlzc2lvbiA9IGF3YWl0IFZvaWNlUmVjb3JkZXJJbXBsLmhhc0F1ZGlvUmVjb3JkaW5nUGVybWlzc2lvbigpLmNhdGNoKCgpID0+IGZhaWx1cmVSZXNwb25zZSgpKTtcbiAgICAgICAgaWYgKGhhdmluZ1Blcm1pc3Npb24udmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzUmVzcG9uc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgICAgICAgLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzdWNjZXNzUmVzcG9uc2UoKSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiBmYWlsdXJlUmVzcG9uc2UoKSk7XG4gICAgfVxuICAgIHBhdXNlUmVjb3JkaW5nKCkge1xuICAgICAgICBpZiAodGhpcy5tZWRpYVJlY29yZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IHJlY29yZGluZ0hhc05vdFN0YXJ0ZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMubWVkaWFSZWNvcmRlci5zdGF0ZSA9PT0gJ3JlY29yZGluZycpIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlci5wYXVzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzdWNjZXNzUmVzcG9uc2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhaWx1cmVSZXNwb25zZSgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bWVSZWNvcmRpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLm1lZGlhUmVjb3JkZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgcmVjb3JkaW5nSGFzTm90U3RhcnRlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5tZWRpYVJlY29yZGVyLnN0YXRlID09PSAncGF1c2VkJykge1xuICAgICAgICAgICAgdGhpcy5tZWRpYVJlY29yZGVyLnJlc3VtZSgpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzdWNjZXNzUmVzcG9uc2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhaWx1cmVSZXNwb25zZSgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRDdXJyZW50U3RhdHVzKCkge1xuICAgICAgICBpZiAodGhpcy5tZWRpYVJlY29yZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBzdGF0dXM6IFJlY29yZGluZ1N0YXR1cy5OT05FIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMubWVkaWFSZWNvcmRlci5zdGF0ZSA9PT0gJ3JlY29yZGluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBzdGF0dXM6IFJlY29yZGluZ1N0YXR1cy5SRUNPUkRJTkcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5tZWRpYVJlY29yZGVyLnN0YXRlID09PSAncGF1c2VkJykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHN0YXR1czogUmVjb3JkaW5nU3RhdHVzLlBBVVNFRCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBzdGF0dXM6IFJlY29yZGluZ1N0YXR1cy5OT05FIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBnZXRTdXBwb3J0ZWRNaW1lVHlwZSgpIHtcbiAgICAgICAgaWYgKChNZWRpYVJlY29yZGVyID09PSBudWxsIHx8IE1lZGlhUmVjb3JkZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IE1lZGlhUmVjb3JkZXIuaXNUeXBlU3VwcG9ydGVkKSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IGZvdW5kU3VwcG9ydGVkVHlwZSA9IHBvc3NpYmxlTWltZVR5cGVzLmZpbmQoKHR5cGUpID0+IE1lZGlhUmVjb3JkZXIuaXNUeXBlU3VwcG9ydGVkKHR5cGUpKTtcbiAgICAgICAgcmV0dXJuIGZvdW5kU3VwcG9ydGVkVHlwZSAhPT0gbnVsbCAmJiBmb3VuZFN1cHBvcnRlZFR5cGUgIT09IHZvaWQgMCA/IGZvdW5kU3VwcG9ydGVkVHlwZSA6IG51bGw7XG4gICAgfVxuICAgIG9uU3VjY2Vzc2Z1bGx5U3RhcnRlZFJlY29yZGluZyhzdHJlYW0pIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVzdWx0ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZWRpYVJlY29yZGVyID0gbmV3IE1lZGlhUmVjb3JkZXIoc3RyZWFtKTtcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlci5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZUluc3RhbmNlRm9yTmV4dE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIHJlamVjdChmYWlsZWRUb1JlY29yZEVycm9yKCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlci5vbnN0b3AgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWltZVR5cGUgPSBWb2ljZVJlY29yZGVySW1wbC5nZXRTdXBwb3J0ZWRNaW1lVHlwZSgpO1xuICAgICAgICAgICAgICAgIGlmIChtaW1lVHlwZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZUluc3RhbmNlRm9yTmV4dE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbGVkVG9GZXRjaFJlY29yZGluZ0Vycm9yKCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2JWb2ljZVJlY29yZGluZyA9IG5ldyBCbG9iKHRoaXMuY2h1bmtzLCB7IHR5cGU6IG1pbWVUeXBlIH0pO1xuICAgICAgICAgICAgICAgIGlmIChibG9iVm9pY2VSZWNvcmRpbmcuc2l6ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZUluc3RhbmNlRm9yTmV4dE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZW1wdHlSZWNvcmRpbmdFcnJvcigpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZWNvcmREYXRhQmFzZTY0ID0gYXdhaXQgVm9pY2VSZWNvcmRlckltcGwuYmxvYlRvQmFzZTY0KGJsb2JWb2ljZVJlY29yZGluZyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVjb3JkaW5nRHVyYXRpb24gPSBhd2FpdCBnZXRCbG9iRHVyYXRpb24oYmxvYlZvaWNlUmVjb3JkaW5nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVJbnN0YW5jZUZvck5leHRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgdmFsdWU6IHsgcmVjb3JkRGF0YUJhc2U2NCwgbWltZVR5cGUsIG1zRHVyYXRpb246IHJlY29yZGluZ0R1cmF0aW9uICogMTAwMCB9IH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlci5vbmRhdGFhdmFpbGFibGUgPSAoZXZlbnQpID0+IHRoaXMuY2h1bmtzLnB1c2goZXZlbnQuZGF0YSk7XG4gICAgICAgICAgICB0aGlzLm1lZGlhUmVjb3JkZXIuc3RhcnQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdWNjZXNzUmVzcG9uc2UoKTtcbiAgICB9XG4gICAgb25GYWlsZWRUb1N0YXJ0UmVjb3JkaW5nKCkge1xuICAgICAgICB0aGlzLnByZXBhcmVJbnN0YW5jZUZvck5leHRPcGVyYXRpb24oKTtcbiAgICAgICAgdGhyb3cgZmFpbGVkVG9SZWNvcmRFcnJvcigpO1xuICAgIH1cbiAgICBzdGF0aWMgYmxvYlRvQmFzZTY0KGJsb2IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWNvcmRpbmdSZXN1bHQgPSBTdHJpbmcocmVhZGVyLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BsaXRSZXN1bHQgPSByZWNvcmRpbmdSZXN1bHQuc3BsaXQoJ2Jhc2U2NCwnKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b1Jlc29sdmUgPSBzcGxpdFJlc3VsdC5sZW5ndGggPiAxID8gc3BsaXRSZXN1bHRbMV0gOiByZWNvcmRpbmdSZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0b1Jlc29sdmUudHJpbSgpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByZXBhcmVJbnN0YW5jZUZvck5leHRPcGVyYXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm1lZGlhUmVjb3JkZXIgIT0gbnVsbCAmJiB0aGlzLm1lZGlhUmVjb3JkZXIuc3RhdGUgPT09ICdyZWNvcmRpbmcnKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVkaWFSZWNvcmRlci5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1doaWxlIHRyeWluZyB0byBzdG9wIGEgbWVkaWEgcmVjb3JkZXIsIGFuIGVycm9yIHdhcyB0aHJvd24nLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZW5kaW5nUmVzdWx0ID0gbmV2ZXJSZXNvbHZpbmdQcm9taXNlKCk7XG4gICAgICAgIHRoaXMubWVkaWFSZWNvcmRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuY2h1bmtzID0gW107XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Vm9pY2VSZWNvcmRlckltcGwuanMubWFwIiwiaW1wb3J0IHsgV2ViUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcbmltcG9ydCB7IFZvaWNlUmVjb3JkZXJJbXBsIH0gZnJvbSAnLi9Wb2ljZVJlY29yZGVySW1wbCc7XG5leHBvcnQgY2xhc3MgVm9pY2VSZWNvcmRlcldlYiBleHRlbmRzIFdlYlBsdWdpbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMudm9pY2VSZWNvcmRlckluc3RhbmNlID0gbmV3IFZvaWNlUmVjb3JkZXJJbXBsKCk7XG4gICAgfVxuICAgIGNhbkRldmljZVZvaWNlUmVjb3JkKCkge1xuICAgICAgICByZXR1cm4gVm9pY2VSZWNvcmRlckltcGwuY2FuRGV2aWNlVm9pY2VSZWNvcmQoKTtcbiAgICB9XG4gICAgaGFzQXVkaW9SZWNvcmRpbmdQZXJtaXNzaW9uKCkge1xuICAgICAgICByZXR1cm4gVm9pY2VSZWNvcmRlckltcGwuaGFzQXVkaW9SZWNvcmRpbmdQZXJtaXNzaW9uKCk7XG4gICAgfVxuICAgIHJlcXVlc3RBdWRpb1JlY29yZGluZ1Blcm1pc3Npb24oKSB7XG4gICAgICAgIHJldHVybiBWb2ljZVJlY29yZGVySW1wbC5yZXF1ZXN0QXVkaW9SZWNvcmRpbmdQZXJtaXNzaW9uKCk7XG4gICAgfVxuICAgIHN0YXJ0UmVjb3JkaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52b2ljZVJlY29yZGVySW5zdGFuY2Uuc3RhcnRSZWNvcmRpbmcoKTtcbiAgICB9XG4gICAgc3RvcFJlY29yZGluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudm9pY2VSZWNvcmRlckluc3RhbmNlLnN0b3BSZWNvcmRpbmcoKTtcbiAgICB9XG4gICAgcGF1c2VSZWNvcmRpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZvaWNlUmVjb3JkZXJJbnN0YW5jZS5wYXVzZVJlY29yZGluZygpO1xuICAgIH1cbiAgICByZXN1bWVSZWNvcmRpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZvaWNlUmVjb3JkZXJJbnN0YW5jZS5yZXN1bWVSZWNvcmRpbmcoKTtcbiAgICB9XG4gICAgZ2V0Q3VycmVudFN0YXR1cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudm9pY2VSZWNvcmRlckluc3RhbmNlLmdldEN1cnJlbnRTdGF0dXMoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWIuanMubWFwIl0sIm5hbWVzIjpbInJ1bnRpbWUiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsImtleSIsIm5leHQiLCJyZXF1aXJlJCQwIiwiZ2V0QmxvYkR1cmF0aW9uIiwicmVxdWlyZSQkMSIsInJlcXVpcmUkJDIiLCJlIiwiciJdLCJtYXBwaW5ncyI6IjtBQUFPLE1BQU0sa0JBQWtCO0FBQUEsRUFDM0IsV0FBVztBQUFBLEVB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O0FBQUEsRUFDbkM7QUFBQSxFQUNJLE9BQU8sYUFBYSxNQUFNO0FBQ3RCLFdBQU8sSUFBSSxRQUFRLENBQUMsWUFBWTtBQUM1QixZQUFNLFNBQVMsSUFBSSxXQUFZO0FBQy9CLGFBQU8sWUFBWSxNQUFNO0FBQ3JCLGNBQU0sa0JBQWtCLE9BQU8sT0FBTyxNQUFNO0FBQzVDLGNBQU0sY0FBYyxnQkFBZ0IsTUFBTSxTQUFTO0FBQ25ELGNBQU0sWUFBWSxZQUFZLFNBQVMsSUFBSSxZQUFZLENBQUMsSUFBSTtBQUM1RCxnQkFBUSxVQUFVLE1BQU07QUFBQSxNQUMzQjtBQUNELGFBQU8sY0FBYyxJQUFJO0FBQUEsSUFDckMsQ0FBUztBQUFBLEVBQ1Q7QUFBQSxFQUNJLGtDQUFrQztBQUM5QixRQUFJLEtBQUssaUJBQWlCLFFBQVEsS0FBSyxjQUFjLFVBQVUsYUFBYTtBQUN4RSxVQUFJO0FBQ0EsYUFBSyxjQUFjLEtBQU07QUFBQSxNQUN6QyxTQUNtQixPQUFPO0FBQ1YsZ0JBQVEsS0FBSyw4REFBOEQsS0FBSztBQUFBLE1BQ2hHO0FBQUEsSUFDQTtBQUNRLFNBQUssZ0JBQWdCLHNCQUF1QjtBQUM1QyxTQUFLLGdCQUFnQjtBQUNyQixTQUFLLFNBQVMsQ0FBRTtBQUFBLEVBQ3hCO0FBQ0E7QUN4TE8sTUFBTSx5QkFBeUIsVUFBVTtBQUFBLEVBQzVDLGNBQWM7QUFDVixVQUFNLEdBQUcsU0FBUztBQUNsQixTQUFLLHdCQUF3QixJQUFJLGtCQUFtQjtBQUFBLEVBQzVEO0FBQUEsRUFDSSx1QkFBdUI7QUFDbkIsV0FBTyxrQkFBa0IscUJBQXNCO0FBQUEsRUFDdkQ7QUFBQSxFQUNJLDhCQUE4QjtBQUMxQixXQUFPLGtCQUFrQiw0QkFBNkI7QUFBQSxFQUM5RDtBQUFBLEVBQ0ksa0NBQWtDO0FBQzlCLFdBQU8sa0JBQWtCLGdDQUFpQztBQUFBLEVBQ2xFO0FBQUEsRUFDSSxpQkFBaUI7QUFDYixXQUFPLEtBQUssc0JBQXNCLGVBQWdCO0FBQUEsRUFDMUQ7QUFBQSxFQUNJLGdCQUFnQjtBQUNaLFdBQU8sS0FBSyxzQkFBc0IsY0FBZTtBQUFBLEVBQ3pEO0FBQUEsRUFDSSxpQkFBaUI7QUFDYixXQUFPLEtBQUssc0JBQXNCLGVBQWdCO0FBQUEsRUFDMUQ7QUFBQSxFQUNJLGtCQUFrQjtBQUNkLFdBQU8sS0FBSyxzQkFBc0IsZ0JBQWlCO0FBQUEsRUFDM0Q7QUFBQSxFQUNJLG1CQUFtQjtBQUNmLFdBQU8sS0FBSyxzQkFBc0IsaUJBQWtCO0FBQUEsRUFDNUQ7QUFDQTsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDhdfQ==
