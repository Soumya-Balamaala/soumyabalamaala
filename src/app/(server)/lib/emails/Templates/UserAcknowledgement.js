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

export const UserAcknowledgement = ({ user }) => (
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
                    <Text className="m-0  text-[18px] font-semibold leading-[28px] text-gray-900">
                      Dear <span className="text-brand">{user.fullname}</span>,
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
                    <Text className="m-0 text-[16px] font-normal  text-gray-900">
                      Thank you for reaching out to us! We appreciate your
                      interest in our services.
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
                    <Text className="m-0 text-[16px] font-normal  text-gray-900">
                      We have received your enquiry and our team is currently
                      reviewing the details. Your enquiry ID is
                      <b> {user.enquiryid}</b>, and we will get back to you as
                      soon as possible with more information regarding your
                      request.
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
                      Requested Services
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td className="w-1/2 mb-2">
                    <ul className="list-disc pl-5 text-[14px] font-normal text-gray-900 m-0">
                      {user.services.map((item, index) => (
                        <li key={index} className="mb-[4px] text-[14px]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>

                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td className="w-1/2 mb-2 whitespace-wrap">
                    <Text className="m-0 text-[14px] font-normal text-gray-900">
                      If you have any additional questions or need further
                      assistance, feel free to reply to this email or contact us
                      at&nbsp;
                      <Link
                        href="mailto:devwithsoumya@gmail.com"
                        className="text-brand font-bold"
                      >
                        devwithsoumya@gmail.com
                      </Link>
                      . We’re here to help!
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td className="w-1/2 mb-2">
                    <Text className="m-0 text-[14px] font-normal text-gray-900">
                      Thank you once again for considering our services. We look
                      forward to working with you!
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

export default UserAcknowledgement;
