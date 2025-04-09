import { NextResponse } from "next/server";

function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

export const globaljsonResponse = {
  success(data, responseMessage, statuscode) {
    const cleanData = isEmpty(data) ? null : data;

    return NextResponse.json(
      {
        success: true,
        message: responseMessage,
        data: cleanData,
      },
      { status: statuscode }
    );
  },

  error(responseMessage, statuscode) {
    return NextResponse.json(
      {
        success: false,
        message: responseMessage,
      },
      { status: statuscode }
    );
  },
};
