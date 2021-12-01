const authController = require("./controllers/authController");
const paymentController = require("./controllers/paymentController");
const basicController = require("./controllers/basicController")
const applicationController = require("./controllers/applicationController")
const maintenanceController = require("./controllers/maintenanceController")

module.exports = (app) => {
  app.post("/api/signup", authController.signup);
  app.post("/api/signin", authController.signin);

  app.get("/api/getUser", basicController.getUser);
  app.get("/api/getRole", basicController.getRole);
  app.post("/api/getUserByRole", basicController.getUserByRole);
  app.post("/api/addProperty", basicController.addProperty)
  app.get("/api/getProperties", basicController.getProperties)

  app.post("/api/renter/getBalance", paymentController.getBalance);
  app.post("/api/owner/chargePayment", paymentController.chargePayment);
  app.post("/api/renter/submitPayment", paymentController.submitPayment);

  app.post("/api/application/apply", applicationController.apply);
  app.post("/api/application/get", applicationController.getApplications);
  app.post("/api/application/getAccepted", applicationController.getAcceptedApplications);
  app.post("/api/application/getArchived", applicationController.getArchivedApplication);


  app.post("/api/application/accept", applicationController.acceptApplication);
  app.post("/api/application/deny", applicationController.denyApplication);
  app.post("/api/application/remove", applicationController.removeApplication);


  app.post("/api/maintenance/submitRequest", maintenanceController.submitRequest);
  app.post("/api/maintenance/approveRequest", maintenanceController.approveRequest);
  app.get("/api/maintenance/getRequest", maintenanceController.getRequest);
  app.post("/api/maintenance/getOwnerRequests", maintenanceController.getOwnerRequests)
}
