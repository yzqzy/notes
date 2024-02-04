#include <napi.h>

// Hello world
Napi::String Hello(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    return Napi::String::New(env, "hello world");
}

// Add  numbers
Napi::Value Add(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    int a = info[0].As<Napi::Number>();
    int b = info[1].As<Napi::Number>();

    return Napi::Number::New(env, a + b);
}
Napi::Value DoubleAdd(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (info.Length() < 2)
    {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[0].IsNumber() || !info[1].IsNumber())
    {
        Napi::TypeError::New(env, "Arguments must be numbers").ThrowAsJavaScriptException();
        return env.Null();
    }

    double a = info[0].As<Napi::Number>().DoubleValue();
    double b = info[1].As<Napi::Number>().DoubleValue();

    return Napi::Number::New(env, a + b);
}

// Callback function
Napi::Value Callback(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    Napi::Function callback = info[0].As<Napi::Function>();
    callback.Call(env.Undefined(), {Napi::String::New(env, "hello world")});
    return env.Undefined();
}

// Object
Napi::Value CreateObject(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    Napi::Object obj = Napi::Object::New(env);
    obj.Set(Napi::String::New(env, "name"), info[0].As<Napi::String>());
    obj.Set(Napi::String::New(env, "age"), info[1].As<Napi::Number>());
    return obj;
}

// Init
Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "hello"), Napi::Function::New(env, Hello));
    exports.Set(Napi::String::New(env, "add"), Napi::Function::New(env, Add));
    exports.Set(Napi::String::New(env, "doubleAdd"), Napi::Function::New(env, DoubleAdd));
    exports.Set(Napi::String::New(env, "callback"), Napi::Function::New(env, Callback));
    exports.Set(Napi::String::New(env, "createObject"), Napi::Function::New(env, CreateObject));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)
