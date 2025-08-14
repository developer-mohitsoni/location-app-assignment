import { JwtPayload } from "jsonwebtoken";

export interface MyJwtPayload extends JwtPayload {
	id: number;
}

export interface Location{
	name: string;
	latitude: number;
	longitude: number;
}