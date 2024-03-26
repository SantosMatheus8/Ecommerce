import {
  kafkaConsumer,
  mailerService,
} from "./bootstrap";
void (async() => {
  console.log("starting consumers...");
  await mailerService.run();
  await kafkaConsumer.start();
  console.log("consumers running...");
})();
