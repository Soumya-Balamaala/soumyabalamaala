import React from "react";
import {
  Html,
  Body,
  Text,
  Img,
  Container,
  Head,
  Column,
  Preview,
  Tailwind,
  Button,
  Section,
  Link,
} from "@react-email/components";

export const EnquiryRaised = ({ user }) => {
  return (
    <Html>
      <Body>
        <Tailwind
          config={{
            theme: {
              extend: {
                colors: {
                  brand: "#4B0082",
                  bgcolor: "#F9F3E3",
                  c1: "#24AE70",
                  c2: "#0000EE",
                },
              },
            },
          }}
        >
          <Container className="bg-c1 w-full rounded-[12px]">
            <Section className="my-[16px] w-[95%]  h-[98%] bg-[#ffffff] rounded-[12px] p-[10px]">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-1/2 ">
                      <Text className="m-0  text-[18px] font-normal leading-[28px] text-gray-900">
                        We have got a New Enquiry which is
                        <b>{user.enquiryid}</b>. Please find the details below
                      </Text>
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="w-1/2 mb-2">
                      <Text className="m-0 text-[16px] font-bold  text-gray-900">
                        Enqiury Details
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/2 mb-2 align-top">
                      <div className="text-[14px] font-normal text-gray-900 mb-1">
                        <Text className="m-0 text-[14px] font-normal text-gray-900">
                          <strong className="mr-[10px]">Enquiry ID:</strong> {user.enquiryid}
                        </Text>
                      </div>
                      <div className="text-[14px] font-normal text-gray-900 mb-1">
                        <Text className="m-0 text-[14px] font-normal text-gray-900">
                          <strong className="mr-[10px]">Name:</strong> {user.fullname}
                        </Text>
                      </div>
                      <div className="text-[14px] font-normal text-gray-900 mb-1">
                        <Text className="m-0 text-[14px] font-normal text-gray-900"></Text>
                        <strong className="mr-[10px]">Company:</strong> {user.company}
                      </div>
                      <div className="text-[14px] font-normal text-gray-900 mb-1">
                        <Text className="m-0 text-[14px] font-normal text-gray-900"></Text>
                        <strong className="mr-[10px]">Email:</strong> {user.email}
                      </div>
                      <div className="text-[14px] font-normal text-gray-900 mb-1">
                        <Text className="m-0 text-[14px] font-normal text-gray-900"></Text>
                        <strong className="mr-[10px]">Mobile:</strong>
                        {user.mobile}
                      </div>
                      <div className="text-[14px] font-normal text-gray-900 mb-1">
                        <Text className="m-0 text-[14px] font-normal text-gray-900"></Text>
                        <strong className="mr-[10px]">Country:</strong> {user.country}
                      </div>
                      <div className="text-[14px] font-normal text-gray-900 mb-1">
                        <Text className="m-0 text-[14px] font-normal text-gray-900">
                          <strong className="mr-[10px]">Services:</strong>
                        </Text>

                        <ul className="list-disc pl-5 text-[14px] font-normal text-gray-900 m-0">
                          {user.services.map((item, index) => (
                            <li key={index} className="mb-[4px] text-[14px]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>

                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="w-1/2 mb-2">
                      <Text className="m-0 text-[18px] font-normal text-gray-900">
                        Best Regards,
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/2 mb-2">
                      <Text className="m-0 text-[18px] font-semibold leading-[28px] text-brand">
                        Soumya Balamaala
                      </Text>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-1/2 mb-2">
                      <Text className="m-0 text-[16px] font-normal leading-[28px] text-gray-900">
                        Full Stack Developer
                      </Text>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-1/2 mb-2">
                      <Link
                        href="https://soumyabalamaala.vercel.app"
                        target="_blank"
                        className="text-brand"
                      >
                        soumyabalamaala.vercel.app
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td className="w-1/2 mb-2">
                      <Link
                        href="mailto:devwithsoumya@gmail.com"
                        className="text-brand"
                      >
                        devwithsoumya@gmail.com
                      </Link>
                    </td>
                  </tr>

                  <tr className="flex w-1/2 items-center justify-start space-x-4">
                    <td className="text-center mr-[10px]">
                      <Link
                        href="https://www.linkedin.com/in/soumyabalamaala"
                        className="text-brand"
                      >
                        LinkedIn
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link
                        href="https://www.instagram.com/soumyabalamaala"
                        className="text-brand"
                      >
                        Instagram
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
};

export default EnquiryRaised;
