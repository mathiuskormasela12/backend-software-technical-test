// ========== IAppConfig

export interface IAppConfig {
	port: number;
	appUrl: string;
	apiUrl: string;
	dbUri: string;
	secretKey: string;
	jwtAcessTokenSecretKey: string;
	jwtRefreshTokenSecretKey: string;
	jwtAccessTokenExpiresIn: string;
	jwtRefreshTokenExpiresIn: string;
	whiteList: string[];
}
