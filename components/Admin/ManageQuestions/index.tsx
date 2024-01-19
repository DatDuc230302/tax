import { serverBackend } from "@/server";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ManageQuestions() {
  const [postParent, setPostParent] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [answers, setAnswers] = useState<any>({});

  const getParentAnswers = async () => {
    try {
      const result = await axios.post(`${serverBackend}/api/v1/get-answer`);
      setAnswers(result.data.answer);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  useEffect(() => {
    getParentAnswers();
  }, []);

  const handlePostParent = async () => {
    const formData = new FormData();
    formData.append("answer", question);
    formData.append("newOption", selectedOption || "");
    try {
      const result = await axios.post(
        `${serverBackend}/api/v1/add-answer`,
        formData
      );
      if (result.data.message === "Thêm câu hỏi và câu trả lời thành công") {
        setPostParent(false);
        getParentAnswers(); // Reload answers after adding a new question
      }
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  const deleteAnswers = async () => {
    const formData = new FormData();
    formData.append("selectedOption", selectedOption || "");
    formData.append("deletedOption", selectedOption || "");
    try {
      const result = await axios.post(
        `${serverBackend}/api/v1/delete-answer`,
        formData
      );
      getParentAnswers(); // Reload answers after deleting answers
    } catch (error) {
      console.error("Error deleting answers:", error);
    }
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="fixed top-0 bottom-0 flex justify-center left-0 right-0 bg-white p-4 py-40 z-20000000">
      <div className="w-[600px] h-[500px] items-center flex flex-col border-[1px] border-[#ccc]">
        <h2>Quản lý câu hỏi</h2>
        <div className="flex py-4 gap-4 w-full items-center">
          <Select
            label="Bảng câu hỏi"
            className="max-w-xs"
            value={selectedOption}
            onChange={(e) => handleOptionChange(e.target.value)}
          >
            {Object.keys(answers).map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
          <Button
            onClick={() => setPostParent(true)}
            className="px-8"
            color="primary"
          >
            +
          </Button>
        </div>
        <Button
          onClick={() => deleteAnswers()}
          className="px-8"
          color="primary"
        >
          Xóa all
        </Button>
        {postParent && (
          <div className="flex items-center gap-2">
            <Input
              onChange={(e: any) => setQuestion(String(e.target.value))}
              variant="bordered"
              label="Thêm câu hỏi"
            />
            <Button
              onClick={() => handlePostParent()}
              className="px-8"
              color="primary"
            >
              Thêm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
