import * as bruxoModel from "../models/bruxoModel.js";

export const listarTodos = async (req, res) => {
  try {
    const bruxos = await bruxoModel.encontreTodos();

    if(!bruxos || bruxos.length === 0) {
      res.status(404).json({
        mensagem: "Não há bruxos na lista.",
        bruxos
      })
    }

    res.status(200).json({
        total: bruxos.length,
        mensagem: "Lista de bruxos",
        bruxos: bruxos
    })

  } catch (error) {
    res.status(500).json({
        error: "Erro interno do servidor.",
        details: error.message,
        status: 500
    });
  }
}