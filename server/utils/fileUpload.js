import formidable from "formidable";
import path from "path";
import fs from "fs";

export default (req, done, error) => {
  let groupName;
  let fileName;
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "../../static/upload");
  form.on("field", (name, field) => {
    if (name === "groupName") {
      groupName = field;
    }
  });
  form.on("file", (field, file) => {
    fileName = file.name;
    fs.rename(file.path, path.join(form.uploadDir, fileName), err => {
      if (err) throw err;
      console.log("File renamed successfully");
    });
  });
  form.on("error", err => {
    console.log(err);
    error();
  });
  form.on("end", () => {
    console.log(groupName);
    done(groupName, fileName);
  });
  form.parse(req);
};
