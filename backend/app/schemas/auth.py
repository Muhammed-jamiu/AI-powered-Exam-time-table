from pydantic import BaseModel, EmailStr


class SignupRequest(BaseModel):

    full_name: str

    employee_id: str

    email: EmailStr

    phone: str

    password: str


class LoginRequest(BaseModel):

    email: EmailStr

    password: str


class OfficerResponse(BaseModel):

    id: int

    full_name: str

    employee_id: str

    email: EmailStr

    phone: str

    role: str

    class Config:

        from_attributes = True


class TokenResponse(BaseModel):

    access_token: str

    token_type: str