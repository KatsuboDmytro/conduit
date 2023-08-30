import { SignUpInDTO } from "../../auth/api/dto/sign-up.in";

interface ProfileState {
  user: Omit<SignUpInDTO['user'], 'token'> | null;
  lastPage: string | null;
}

const initialState: ProfileState = {
  user: null,
  lastPage: null,
};