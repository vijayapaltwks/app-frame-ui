import { registerApplication, start } from "single-spa";
import ApplicationConfig from "./config/application-config/AppConfig";

const GetImportMaps = ()=>{
  const importMaps = {};
  ApplicationConfig.applications.forEach(application=>{
    importMaps[application.moduleName] = application.appUrl + application.bundlePath;
  });
  return { "imports": importMaps};
}

const AppendImportMaps = ()=>{
  var scriptElement = document.createElement("script");
  scriptElement.type="systemjs-importmap";
  scriptElement.innerHTML = JSON.stringify(GetImportMaps());
  document.head.appendChild(scriptElement);
}

const RegisterApplication = ()=>{
  ApplicationConfig.applications.map(application=>{
    registerApplication(
      application.appName,
      ()=> import(application.moduleName),
      (location) => location.pathname.startsWith(application.relativePath)
    )
  });

  AppendImportMaps();

  start();
}

export default RegisterApplication;

