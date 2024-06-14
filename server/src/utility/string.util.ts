import env from '../../env';

export const buildHtmlRegisterUser = (token: string) => {
	const generateUrl = `${env.app.base_url}/verify?token=${token}`;
	return `
        <div style="width: 600px; height: 300px; display: flex; justify-content: center; align-items: center; background-color: #f0f0f0; margin: 0 auto;">
            <a href="${generateUrl}" style="text-decoration: none;">
                <button style="background-color: blue; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                    Verify
                </button>
            </a>
        </div>
    `;
};
