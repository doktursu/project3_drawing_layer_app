class AnimationsController < ApplicationController
  before_action :set_animation, only: [:show, :update, :destroy]

  # GET /animations
  # GET /animations.json
  def index
    @animations = Animation.all

    render json: @animations
  end

  # GET /animations/1
  # GET /animations/1.json
  def show
    render json: @animation
  end

  # POST /animations
  # POST /animations.json
  def create
    params[:animation][:frameOrder] = JSON.parse(params[:animation][:frameOrder])
    params[:animation][:layerOrder] = JSON.parse(params[:animation][:layerOrder])
    params[:animation][:layerInfo] = JSON.parse(params[:animation][:layerInfo])

    @animation = Animation.new(animation_params)

    if @animation.save
      render json: @animation, status: 200, location: @animation
    else
      render json: @animation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /animations/1
  # PATCH/PUT /animations/1.json
  def update
    @animation = Animation.find(params[:id])

    if @animation.update(animation_params)
      head :no_content
    else
      render json: @animation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /animations/1
  # DELETE /animations/1.json
  def destroy
    @animation.destroy

    head :no_content
  end

  private

    def set_animation
      @animation = Animation.find(params[:id])
    end

    def animation_params
      params.require(:animation).permit!
    end
end
