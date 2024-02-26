import {updateConfig} from "../../components/helpers/utils";

export default function handler(req, res) {
    if (req.method === 'POST') {
        return saveConfig(req, res);
    }
}

/**
 * Update js config
 */
const saveConfig = async (req, res) => {
    const newConfig = req.body.config;
    updateConfig(newConfig);

    return res.status(200).json({result: true});
}
