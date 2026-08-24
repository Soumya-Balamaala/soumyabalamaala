const ACCODE = 'SOU';

export interface ReferralUploadPayload {
  resume: File;
  name: string;
  email: string;
  phone: string;
  targetRole: string;
}

// NOTE: as of this writing, the live backend still 400s with "referralId is
// required" even when accode is sent instead — this shape (accode-scoped, no
// referralId) is what was documented as the intended contract, matching
// every other public endpoint's tenant-scoping pattern. Re-verify once the
// backend deploys support for it.
export async function submitReferralUpload(payload: ReferralUploadPayload): Promise<unknown> {
  const formData = new FormData();
  formData.append('accode', ACCODE);
  formData.append('name', payload.name);
  formData.append('email', payload.email);
  formData.append('phone', payload.phone);
  formData.append('targetRole', payload.targetRole);
  formData.append('resume', payload.resume);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/public/referral-upload`, {
    method: 'POST',
    body: formData,
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = result?.respdesc || result?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return result;
}
